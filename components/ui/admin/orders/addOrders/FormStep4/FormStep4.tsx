import { Ingredient, Order, OrderMeal } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {
  currentOrder: Order | null;
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  orderMeals: OrderMeal[];
};

function FormStep4({ currentOrder, setCurrentOrder, orderMeals }: Props) {
  const [notes, setNotes] = useState(currentOrder?.notes || "");

  useEffect(() => {
    setCurrentOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          meals: orderMeals,
          status: "new",
          orderDate: new Date().toISOString(),
        };
      }
      return prevOrder;
    });
  }, []);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNotes(value);
    setCurrentOrder((prevOrder) => ({
      ...prevOrder!,
      notes: value,
    }));
  };

  if (!currentOrder) {
    return <p>No order to display</p>;
  }

  const totalAmount = currentOrder?.meals?.reduce((acc, orderMeal) => {
    return acc + parseFloat(orderMeal.meal.price) * orderMeal.quantity;
  }, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="space-y-2">
        <p>
          <strong>Order ID:</strong> {currentOrder.id}
        </p>
        <p>
          <strong>Customer Name:</strong> {currentOrder.customer.name}
        </p>
        <p>
          <strong>Delivery:</strong> {currentOrder.delivery ? "Yes" : "No"}
        </p>
        <p>
          <strong>Order Date:</strong> {new Date(currentOrder.orderDate).toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> ${totalAmount?.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {currentOrder.status}
        </p>
        <p>
          <strong>Meals:</strong>
        </p>
        <ul className="list-disc list-inside">
          {currentOrder.meals?.map((orderMeal, index) => (
            <li key={index}>
              {orderMeal.meal.name} - Quantity: {orderMeal.quantity}
              <ul className="list-disc list-inside ml-4">
                {orderMeal.meal.ingredients.map((ingredient: Ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <label className="block">
          <span>Notes:</span>
          <textarea
            name="notes"
            value={notes}
            onChange={handleNotesChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          />
        </label>
      </div>
    </div>
  );
}

export default FormStep4;