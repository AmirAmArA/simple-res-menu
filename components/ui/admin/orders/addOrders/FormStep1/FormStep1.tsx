import { Customer, Order } from "@/types";
import React, { useState } from "react";
import SearchCustomerTable from "./SearchCustomerTable";

type Props = {
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  
};

const fetchCustomers = async (
  searchTerm: string,
  lastVisibleDoc: string | null
): Promise<{
  customers: Customer[];
  lastVisibleDoc: string | null;
  hasMore: boolean;
}> => {
  const response = await fetch(
    `/api/customers/getCustomers?limit=10&searchText=${searchTerm}&startAfter=${
      lastVisibleDoc || ""
    }`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  const data = await response.json();
  return data;
};

function FormStep1({ setCurrentOrder }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = (e: any) => {
    e.preventDefault();
    if (hasMore) {
      loadCustomers(searchTerm);
    }
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setSearchTerm("");
      setLastVisibleDoc(null);
      setCustomers([]);
    }
    setSearchTerm((prev) => (prev = value));
  };

  const handleCustomerSelect = (customer: Customer) => {
    setCurrentOrder((prevOrder) => ({
      ...prevOrder!,
      customer,
    }));
    setSearchTerm(customer.phone);
  };

  const loadCustomers = async (searchText: string) => {
    try {
      const data = await fetchCustomers(searchText, lastVisibleDoc);
      setCustomers((prev) => {
        return [...prev, ...data.customers];
      });
      setLastVisibleDoc((prev) => (prev = data.lastVisibleDoc));
      setHasMore((prev) => (prev = data.hasMore));
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loadCustomers(searchTerm);
  };
  return (
    <div className="flex flex-row justify-start items-start gap-5 ">
      <form onSubmit={handleSubmit} className="space-y-4 w-72 ">
        <h2 className="text-xl font-bold">Search Customer</h2>
        <label className="block">
          <span className="text-white">Phone Number:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
          />
        </label>
        <button className="btn" type="submit">
          🔍
        </button>
      </form>
      <div className="flex-1">
        <SearchCustomerTable
          customers={customers}
          selectCustomer={handleCustomerSelect}
          hasMore={hasMore}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}

export default FormStep1;
