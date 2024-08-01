"use client";
import Button from "@/components/Button";
import { Customer, OrderMeal, SubMeal } from "@/types";
import React, { cache, useEffect, useState } from "react";
import FormStep1 from "../FormStep1/FormStep1";
import FormStep2 from "./FormStep2";

type Props = {
  toggleModal: () => void;
};

function AddOrderModal({ toggleModal }: Props) {
  const [step, setStep] = useState(1);
  const [orderMeals, setOrderMeals] = useState<OrderMeal[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const toggleWrapper = () => {
    setStep(1);
    toggleModal();
  };

  const handleStep = () => {
    if (step < 4) setStep(step + 1);
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
        return <FormStep1 setSelectedCustomer={setSelectedCustomer} />;
      case 2:
        return (
          <FormStep2 orderMeals={orderMeals} setOrderMeals={setOrderMeals} />
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
    <div className="fixed overflow-auto inset-0 bg-gray-600 bg-opacity-99 flex flex-col z-10">
      <div className="flex justify-end p-20">
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
      <div className="p-20 my-10 ">{renderForm()}</div>

      <div className="flex justify-end p-20">
        <Button text="Next" func={handleStep} className="btn btn-info" />
      </div>
    </div>
  );
}

export default AddOrderModal;
