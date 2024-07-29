"use client";
import React, { useState } from "react";
import { Order } from "@/types";
import Button from "@/components/Button";
import AddOrderModal from "./AddOrderModal";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const toggleModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
  };
  return (
    <div className="overflow-x-auto">
      <Button
        text={"New Order"}
        func={toggleModal}
        className="btn btn-accent"
      />
      {showAddOrderModal && (
        <AddOrderModal
          toggleModal={toggleModal}
          // onClose={() => setShowAddOrderModal(false)}
          // onOrderAdded={handleAddOrder}
        />
      )}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.customer.name}</td>
              <td className="border px-4 py-2">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
