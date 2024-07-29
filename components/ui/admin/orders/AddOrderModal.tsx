"use client";
import Button from "@/components/Button";
import { Customer } from "@/types";
import React, { useEffect, useState } from "react";
type Props = {
  toggleModal: () => void;
};
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
function AddOrderModal({ toggleModal }: Props) {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    const loadCustomers = async () => {
      const fetchedCustomers = await fetchCustomers();
      setCustomers(fetchedCustomers);
    };
    loadCustomers();
  }, []);

  const toggleWrapper = () => {
    setStep(1);
    toggleModal();
  };

  const handleStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered: Customer[] = customers.filter((customer) =>
        customer.phone.startsWith(value)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchTerm(customer.phone);
    setFilteredCustomers([]);
  };

  const steps = [
    { label: "Choose Customer", activeStep: [1, 2, 3, 4] },
    { label: "Choose Meals", activeStep: [2, 3, 4] },
    { label: "Delivery", activeStep: [3, 4] },
    { label: "Order Summary", activeStep: [4] },
  ];

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <form className="space-y-4 w-72 ">
            <h2 className="text-xl font-bold">Choose Customer</h2>
            <label className="block">
              <span className="text-white">Phone Number:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {filteredCustomers.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded-md shadow-sm max-h-48 overflow-y-auto bg-white">
                  {filteredCustomers.map((customer, index) => (
                    <li
                      key={index}
                      onClick={() => handleCustomerSelect(customer)}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      {customer.name} - {customer.phone}
                    </li>
                  ))}
                </ul>
              )}
            </label>
            <label className="block">
              <span className="text-white">Name:</span>
              <input
                type="text"
                name="name"
                value={selectedCustomer?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </form>
        );
      case 2:
        return (
          <form className="space-y-4">
            <h2 className="text-xl font-bold">Choose Meals</h2>
            <label className="block">
              <span className="text-gray-700">Plan:</span>
              <select
                name="plan"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </form>
        );
      case 3:
        return (
          <form className="space-y-4">
            <h2 className="text-xl font-bold">Delivery</h2>
            <label className="block">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone Number:</span>
              <input
                type="text"
                name="phoneNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </form>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold">Order Summary</h2>
            <p>
              Your order is being processed. You will receive your product soon.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-99 flex flex-col z-10">
      <div className="flex justify-end p-20">
        <Button text="❌" func={toggleWrapper} className="btn btn-error" />
      </div>
      <ul className="steps">
        {steps.map((stepObj, index) => (
          <li
            key={index}
            className={`step ${
              stepObj.activeStep.includes(step) ? "step-primary" : ""
            }`}
          >
            {stepObj.label}
          </li>
        ))}
      </ul>
      <div className="p-20 flex flex-col justify-center items-center">
        {renderForm()}
      </div>

      <div className="flex justify-end p-20">
        <Button text="Next" func={handleStep} className="btn btn-info" />
      </div>
    </div>
  );
}

export default AddOrderModal;
