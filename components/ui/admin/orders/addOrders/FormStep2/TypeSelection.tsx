import { MealType } from "@/types";
import React, { useState } from "react";

interface TypeSelectionProps {
  availableTypes: MealType[];
  onChange: (parentTypeId: string) => void;
}

function TypeSelection({ availableTypes, onChange }: TypeSelectionProps) {
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  const handleButtonClick = (parentTypeId: string) => {
    setFocusedButton(parentTypeId);
    onChange(parentTypeId);
  };

  return (
    <div className="flex space-x-4 mt-1">
      {availableTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => handleButtonClick(type.id)}
          className={`px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:bg-gray-100 ${
            focusedButton === type.id ? "bg-gray-200" : ""
          }`}
        >
          {type.type}{" "}
          <span role="img" aria-label={type.type}>
            🍽️
          </span>
        </button>
      ))}
    </div>
  );
}

export default TypeSelection;
