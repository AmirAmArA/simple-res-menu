"use client";
import React, { useEffect, useState } from "react";
import { CustomerTableActions } from "./CustomerTableActions";
import { Customer } from "@/types";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

type CustomerTableRowProps = {
  customer: Customer;
  customers: Customer[];
};

export const CustomerTableRow: React.FC<CustomerTableRowProps> = ({
  customer,
  customers,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const [editingCustomerID, setEditingCustomerID] = useState<string | null>(
    null
  );
  const [editedCustomer, setEditedCustomer] = useState<Partial<Customer>>({});

  useEffect(() => {}, [customers]);
  const handleEdit = (customer: Customer) => {
    setEditingCustomerID(customer.id);
    setEditedCustomer(customer);
  };

  const handleDelete = (id: string) => {
    setCustomerToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete) {
      try {
        const response = await fetch(`/api/customers/deleteCustomer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: customerToDelete }),
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to delete customer");
        }

        customers.filter((customer) => customer.id !== customerToDelete);
        window.location.reload();
      } catch (err) {
        console.error("Error deleting customer:", err);
      } finally {
        setShowDeleteModal(false);
        setCustomerToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/customers/editCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCustomer),
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to save customer");
      }

      customers.map((cust) =>
        cust.id === editedCustomer.id ? (editedCustomer as Customer) : cust
      );
      setEditingCustomerID(null);
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleChange = (field: keyof Customer, value: string) => {
    setEditedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <tr>
        <td className="px-4 py-2">
          {editingCustomerID === customer.id ? (
            <input
              className="input input-bordered input-sm max-w-20"
              type="text"
              value={editedCustomer.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            customer.name
          )}
        </td>
        <td className="px-4 py-2">
          {editingCustomerID === customer.id ? (
            <input
              className="input input-bordered input-sm max-w-20"
              type="text"
              value={editedCustomer.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            customer.phone
          )}
        </td>
        <td className="px-4 py-2">
          {editingCustomerID === customer.id ? (
            <input
              className="input input-bordered input-sm max-w-20"
              type="text"
              value={editedCustomer.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          ) : (
            customer.address
          )}
        </td>
        <td className="px-4 py-2">
          {editingCustomerID === customer.id ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCustomerID(null)}
                className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <CustomerTableActions
              customer={customer}
              onEdit={() => handleEdit(customer)}
              onDelete={() => handleDelete(customer.id)}
            />
          )}
        </td>
      </tr>
      {showDeleteModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this customer?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};
