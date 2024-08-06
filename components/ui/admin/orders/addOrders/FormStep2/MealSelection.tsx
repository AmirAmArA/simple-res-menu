import Button from "@/components/Button";
import { MealType, OrderMeal, SubMeal, Ingredient } from "@/types";
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

async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/getIngredients`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Ingredients");
  }
  const data = await response.json();

  return data;
}

const MealSelection: React.FC<MealSelectionProps> = ({
  mealTypeID,
  setMealTypeID,
  setShowAddMeal,
  setOrderMeals,
  orderMeals,
}) => {
  const [selectedMeal, setSelectedMeal] = useState<SubMeal | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [filteredMeals, setFilteredMeals] = useState<SubMeal[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    async function getMeals() {
      const meals = await fetchSubMeals(mealTypeID.id);
      setFilteredMeals(meals);
    }
    getMeals();
  }, [mealTypeID]);

  useEffect(() => {
    async function loadIngredients() {
      const ingredients = await fetchIngredients();
      setAllIngredients(ingredients);
    }
    loadIngredients();
  }, []);

  useEffect(() => {
    if (selectedMeal) {
      const initialIngredients = new Set(
        selectedMeal.ingredients.map((ingredient) => ingredient.id)
      );
      setSelectedIngredients(initialIngredients);
    }
  }, [selectedMeal]);

  const handleAddMeal = () => {
    if (selectedMeal && quantity >= 1) {
      const finalMeal = {
        ...selectedMeal,
        ingredients: allIngredients.filter((ingredient) =>
          selectedIngredients.has(ingredient.id)
        ),
      };
      setOrderMeals((prevOrderMeals) => [
        ...prevOrderMeals,
        { meal: finalMeal, quantity },
      ]);
      setSelectedMeal(null);
      setQuantity(1);
      setMealTypeID(null);
      setShowAddMeal(false);
    }
  };

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(ingredientId)) {
        newState.delete(ingredientId);
      } else {
        newState.add(ingredientId);
      }
      return newState;
    });
  };

  const renderMeals = () => (
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
  );

  const renderIngredients = () => (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Ingredients</h3>
      <div className="flex flex-wrap gap-4">
        {allIngredients.map((ingredient) => (
          <label key={ingredient.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedIngredients.has(ingredient.id)}
              onChange={() => handleIngredientToggle(ingredient.id)}
              className="mr-2"
            />
            {ingredient.name}
          </label>
        ))}
      </div>
    </div>
  );

  return filteredMeals.length > 0 ? (
    <div className="flex flex-col space-y-4">
      {renderMeals()}
      {selectedMeal && (
        <>
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
          {mealTypeID.type !== "drinks" && renderIngredients()}
        </>
      )}
    </div>
  ) : (
    <p>No Meals for this type</p>
  );
};

export default MealSelection;
