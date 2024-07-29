// src/components/CustomerTable/AddCustomerModal.tsx

"use client";
import React, { useState } from "react";
import { Customer } from "@/types";

type AddCustomerModalProps = {
  customers: Customer[];
};

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ customers }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setName("");
    setPhone("");
    setAddress("");
    setShowModal(false);
  };

  const handleAddCustomer = async () => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/customers/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, address }),
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      const newCustomer = await response.json();
      customers.map((cust) =>
        cust.id === newCustomer.id ? (newCustomer as Customer) : cust
      );
      setName("");
      setPhone("");
      setAddress("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding customer:", error);
    } finally {
      setIsAdding(false);
      setShowModal(false);
    }
  };

  if (!showModal)
    return (
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add Customer
      </button>
    );
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-2">Add New Customer</h2>
        <div className="flex flex-col space-y-2">
          <input
            className="input input-bordered input-sm"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input input-bordered input-sm"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input input-bordered input-sm"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-secondary"
              onClick={handleCloseModal}
              disabled={isAdding}
            >
              Cancel
            </button>
            <button
              className={`btn btn-primary ${isAdding ? "loading" : ""}`}
              onClick={handleAddCustomer}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
