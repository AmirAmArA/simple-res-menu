import React from "react";
import CustomerTable from "@/components/ui/admin/customers/table/CustomerTable";
import { Customer } from "@/types";

async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetch(
    "http://localhost:3000/api/customers/getCustomers",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Customers");
  }
  const data = await response.json();

  return data;
}
const page: React.FC = async () => {
  let customers: Customer[] = [];
  let error: string | null = null;

  try {
    customers = await fetchCustomers();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerTable customers={customers} />
    </div>
  );
};

export default page;
