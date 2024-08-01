import React from "react";
import CustomerTable from "@/components/ui/admin/customers/table/CustomerTable";
import { Customer } from "@/types";

async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers/getCustomers`,
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

  return data.customers;
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
