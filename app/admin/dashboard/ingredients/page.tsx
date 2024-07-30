import IngredientsComponent from "@/components/ui/admin/ingredients/IngredientsComponent";
import { Ingredient } from "@/types";
import React from "react";

type Props = {};

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

async function page({}: Props) {
  let ingredients: Ingredient[] = [];
  let error: string | null = null;

  try {
    ingredients = await fetchIngredients();
  } catch (err) {
    error = (err as Error).message;
  }
  return (
    <div>
      {/* <h1>Sub-Meals for {slug}</h1> */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <IngredientsComponent initialIngredients={ingredients} />
      )}
    </div>
  );
}

export default page;
