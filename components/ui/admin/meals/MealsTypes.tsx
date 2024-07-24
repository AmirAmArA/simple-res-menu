import Link from "next/link";
import React from "react";

type MealType = {
  id: string;
  type: string;
};

async function fetchMealTypes(): Promise<MealType[]> {
  const response = await fetch("http://localhost:3000/api/meals/getTypes", {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch meal types");
  }
  const data = await response.json();
  return data;
}

async function MealsTypes() {
  const mealTypes = await fetchMealTypes();

  return (
    <div>
      <div className="space-x-2">
        {mealTypes.map((mealType: any) => (
          <Link
            key={mealType.id}
            className="mt-auto mx-auto "
            href={`/admin/dashboard/meals/${mealType.id}`}
          >
            <button className="btn btn-accent">{mealType.type}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MealsTypes;
