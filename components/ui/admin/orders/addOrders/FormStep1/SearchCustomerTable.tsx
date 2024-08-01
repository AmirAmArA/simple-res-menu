"use client";
import { Customer } from "@/types";
import React, { useState } from "react";

type Props = {
  customers: Customer[];
  selectCustomer: (c: Customer) => void;
  hasMore: boolean;
  handleLoadMore: (e: any) => void;
};

function SearchCustomerTable({
  customers,
  selectCustomer,
  hasMore,
  handleLoadMore,
}: Props) {
  const [focusedButton, setFocusedButton] = useState<string | null>(null);
  if (customers.length > 0)
    return (
      <div>
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => {
                    selectCustomer(customer);
                    setFocusedButton(customer.id);
                  }}
                  className={`cursor-pointer hover:bg-gray-100 ${
                    focusedButton === customer.id ? "bg-red-200" : ""
                  }`}
                >
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMore && (
            <button onClick={handleLoadMore} className="btn btn-primary mt-4">
              Load More
            </button>
          )}
        </div>
      </div>
    );
}

export default SearchCustomerTable;
