"use client";
import React, { useState } from "react";

type AddMealModalProps = {
  onClose: () => void;
  onAdd: (meal: { smID: string; name: string; price: string }) => void;
  smID: string;
};

const AddMealModal: React.FC<AddMealModalProps> = ({
  onClose,
  onAdd,
  smID,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name.trim() && price.trim()) {
      onAdd({ smID, name, price });
      setName("");
      setPrice("");
    }
  };

  const handleClose = () => {
    onClose();
    setName("");
    setPrice("");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-gray-700 p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Add Meal</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="mr-2 bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMealModal;
