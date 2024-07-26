import { Ingredient, SubMeal } from "@/types";
import React, { useState } from "react";

interface DropdownWithCheckboxesProps {
  allIngredients: Ingredient[];
  subMeal: SubMeal;
  handleChange: (
    subMealId: string,
    field: keyof SubMeal,
    value: string
  ) => void;
  editedSubMeals: Record<string, SubMeal>;
}

const DropdownWithCheckboxes: React.FC<DropdownWithCheckboxesProps> = ({
  allIngredients,
  subMeal,
  handleChange,
  editedSubMeals,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedIngredients = editedSubMeals[subMeal.id]?.ingredients || [];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheckboxChange = (ingredient: Ingredient) => {
    const isChecked = selectedIngredients.some(
      (selectedIngredient) => selectedIngredient.name === ingredient.name
    );
    const updatedIngredients = isChecked
      ? selectedIngredients.filter(
          (selectedIngredient) => selectedIngredient.name !== ingredient.name
        )
      : [...selectedIngredients, ingredient];

    handleChange(
      subMeal.id,
      "ingredients",
      updatedIngredients.map((ing) => ing.name).join(",")
    );
  };

  return (
    <div className="relative">
      <button
        className="input input-bordered input-sm"
        onClick={toggleDropdown}
      >
        {selectedIngredients.map((ingredient) => ingredient.name).join(", ") ||
          "Select ingredients"}
      </button>
      {dropdownOpen && (
        <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10">
          <ul className="h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {allIngredients.map((ingredient) => (
              <li key={ingredient.id} className="relative py-2 pl-3 pr-9">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-10 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedIngredients.some(
                      (selectedIngredient) =>
                        selectedIngredient.name === ingredient.name
                    )}
                    onChange={() => handleCheckboxChange(ingredient)}
                  />
                  <span className="ml-3 block truncate">{ingredient.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
