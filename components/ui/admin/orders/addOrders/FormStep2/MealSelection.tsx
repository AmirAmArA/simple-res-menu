import Button from "@/components/Button";
import { MealType, OrderMeal, SubMeal } from "@/types";
import React, { useEffect, useState } from "react";

interface MealSelectionProps {
  mealTypeID: MealType;
  setMealTypeID: React.Dispatch<React.SetStateAction<MealType | null>>;
  setShowAddMeal: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderMeals: React.Dispatch<React.SetStateAction<OrderMeal[]>>;
  orderMeals: OrderMeal[];
}

async function fetchSubMeals(id: string): Promise<SubMeal[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/meals/getSubMeals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meal types");
  }
  const data = await response.json();

  return data;
}

function MealSelection({
  mealTypeID,
  setMealTypeID,
  setShowAddMeal,
  setOrderMeals,
  orderMeals,
}: MealSelectionProps) {
  const [selectedMeal, setSelectedMeal] = useState<SubMeal | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [filteredMeals, setFilteredMeals] = useState<SubMeal[]>([]);

  useEffect(() => {
    async function getMeals() {
      const meals = await fetchSubMeals(mealTypeID.id);
      setFilteredMeals(meals);
    }
    getMeals();
  }, [mealTypeID]);

  const handleAddMeal = () => {
    if (selectedMeal && quantity >= 1) {
      setOrderMeals([...orderMeals, { meal: selectedMeal, quantity }]);
      setSelectedMeal(null);
      setQuantity(1);
      setMealTypeID(null);
      setShowAddMeal(false);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-4">
        {filteredMeals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => setSelectedMeal(meal)}
            className={`px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:bg-gray-100 ${
              selectedMeal?.id === meal.id ? "bg-gray-200" : ""
            }`}
          >
            {meal.name} 🍽️ - ${meal.price}
          </button>
        ))}
      </div>
      {selectedMeal && (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value, 10)))
            }
            className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            min="1"
          />
          <Button
            text="Add Meal"
            func={handleAddMeal}
            className="btn btn-success"
          />
        </div>
      )}
    </div>
  );
}

export default MealSelection;
