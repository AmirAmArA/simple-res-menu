import Button from "@/components/Button";
import { MealType, OrderMeal } from "@/types";
import React, { useEffect, useState } from "react";
import TypeSelection from "./TypeSelection";
import MealSelection from "./MealSelection";

const fetchMealTypes = async (): Promise<MealType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/meals/getTypes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch types");
  }
  return response.json();
};

type Props = {
  orderMeals: OrderMeal[];
  setOrderMeals: React.Dispatch<React.SetStateAction<OrderMeal[]>>;
};

function FormStep2({ orderMeals, setOrderMeals }: Props) {
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    const fetchedMealTypes = await fetchMealTypes();
    setMealTypes(fetchedMealTypes);
  };

  const handleMealTypeChange = async (parentTypeId: string) => {
    const parentType =
      mealTypes.find((type: any) => type.id === parentTypeId) || null;
    setSelectedMealType(parentType);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Add Meals</h2>
      <div className="space-y-2">
        {orderMeals.map((orderMeal, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span>{orderMeal.meal.name}</span>
            <span>Quantity: {orderMeal.quantity}</span>
            <span>Price: ${orderMeal.meal.price}</span>
          </div>
        ))}
      </div>
      {showAddMeal ? (
        <div className="flex flex-col space-y-4">
          <TypeSelection
            availableTypes={mealTypes}
            onChange={handleMealTypeChange}
          />
          {selectedMealType && (
            <MealSelection
              mealTypeID={selectedMealType}
              setMealTypeID={setSelectedMealType}
              setOrderMeals={setOrderMeals}
              orderMeals={orderMeals}
              setShowAddMeal={setShowAddMeal}
            />
          )}
        </div>
      ) : (
        <Button
          text="+"
          func={() => setShowAddMeal(true)}
          className="btn btn-primary"
        />
      )}
    </div>
  );
}

export default FormStep2;
