"use client";
import React, { useState } from "react";
import { Order } from "@/types";
import Button from "@/components/Button";
import AddOrderModal from "./addOrders/AddOrderModal";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const toggleModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
  };

  const calculateTotalAmount = (order: Order) => {
    return order.meals
      .reduce((total, orderMeal) => {
        return total + parseFloat(orderMeal.meal.price) * orderMeal.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <>
      <Button
        text={"New Order"}
        func={toggleModal}
        className="btn btn-accent"
      />
      <div className="overflow-x-auto">
        {showAddOrderModal && <AddOrderModal toggleModal={toggleModal} />}
        <table className="table-auto w-full ">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Delivery</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className=" px-4 py-2">{order.id}</td>
                <td className=" px-4 py-2">{order.customer.name}</td>
                <td className=" px-4 py-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className=" px-4 py-2">{order.delivery ? "Yes" : "No"}</td>
                <td className=" px-4 py-2">{order.status}</td>
                <td className=" px-4 py-2">${calculateTotalAmount(order)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersTable;
