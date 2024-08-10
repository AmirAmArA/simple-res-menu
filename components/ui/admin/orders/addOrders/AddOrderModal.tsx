"use client";
import Button from "@/components/Button";
import { Customer, Order, OrderMeal, SubMeal } from "@/types";
import React, { cache, useEffect, useState } from "react";
import FormStep1 from "./FormStep1/FormStep1";
import FormStep2 from "./FormStep2/FormStep2";
import FormStep3 from "./FormStep3/FormStep3";
import FormStep4 from "./FormStep4/FormStep4";

type Props = {
  toggleModal: () => void;
};

function AddOrderModal({ toggleModal }: Props) {
  const [step, setStep] = useState(1);
  const [orderMeals, setOrderMeals] = useState<OrderMeal[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleWrapper = () => {
    setStep(1);
    toggleModal();
  };

  const handleSubmit = async () => {
    if (!currentOrder) return;

    setLoading(true);

    try {
      const response = await fetch("/api/orders/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOrder),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Order added successfully:", data);
    } catch (error) {
      console.error("Error adding order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStep = () => {
    if (step < 4) setStep(step + 1);
    if (step === 4) handleSubmit();
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
        return <FormStep1 setCurrentOrder={setCurrentOrder} />;
      case 2:
        return (
          <FormStep2 orderMeals={orderMeals} setOrderMeals={setOrderMeals} />
        );
      case 3:
        return (
          <FormStep3
            setCurrentOrder={setCurrentOrder}
            currentOrder={currentOrder}
          />
        );
      case 4:
        return (
          <FormStep4
            currentOrder={currentOrder}
            setCurrentOrder={setCurrentOrder}
            orderMeals={orderMeals}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed  inset-0 bg-gray-600 bg-opacity-99 flex flex-col z-10">
      <div className="flex justify-end p-5">
        <Button text="❌" func={toggleWrapper} className="btn btn-error" />
      </div>
      <div className="w-full">
        <ul className="w-full steps">
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
      </div>
      <div className="p-5 my-5 ">{renderForm()}</div>

      <div className="flex justify-end p-10">
        <Button
          text={loading ? "Submitting..." : "Next"}
          func={handleStep}
          className="btn btn-info"
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default AddOrderModal;
