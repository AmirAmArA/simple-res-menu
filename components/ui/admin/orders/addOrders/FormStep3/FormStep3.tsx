import { Customer, Order } from "@/types";
import React, { useState } from "react";

type Props = {
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  currentOrder: Order | null;
};

function FormStep3({ setCurrentOrder, currentOrder }: Props) {
  const [deliveryOption, setDeliveryOption] = useState<1 | 0>(0);
  const [address, setAddress] = useState(currentOrder?.customer.address);
  const [phoneNumber, setPhoneNumber] = useState(currentOrder?.customer.phone);

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) as 1 | 0;
    setDeliveryOption(value);
    setCurrentOrder((prevOrder) => ({
      ...prevOrder!,
      delivery: value === 1,
    }));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
    setCurrentOrder((prevOrder) => ({
      ...prevOrder!,
      customer: {
        ...prevOrder!.customer,
        address: value,
      },
    }));
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setCurrentOrder((prevOrder) => ({
      ...prevOrder!,
      customer: {
        ...prevOrder!.customer,
        phoneNumber: value,
      },
    }));
  };
  return (
    <div>
      <form className="space-y-4">
        <h2 className="text-xl font-bold">Delivery or Pick Up</h2>
        <label className="block">
          <input
            type="radio"
            name="deliveryOption"
            value={1}
            checked={deliveryOption === 1}
            onChange={handleDeliveryChange}
            className="mr-2"
          />
          Delivery
        </label>
        <label className="block">
          <input
            type="radio"
            name="deliveryOption"
            value={0}
            checked={deliveryOption === 0}
            onChange={handleDeliveryChange}
            className="mr-2"
          />
          Pick Up
        </label>

        {deliveryOption === 1 && (
          <>
            <h2 className="text-xl font-bold">Delivery Details</h2>
            <label className="block">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleAddressChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone Number:</span>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </>
        )}
      </form>
    </div>
  );
}

export default FormStep3;
