import SubMealsComponent from "@/components/ui/admin/meals/SubMealsComponent";
import React from "react";

type Ingredient = {
  id: string;
  name: string;
};

type SubMeal = {
  id: string;
  name: string;
  ingredients: Ingredient[];
  price: string;
};
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

async function fetchIngredients(): Promise<SubMeal[]> {
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
    throw new Error("Failed to fetch meal types");
  }
  const data = await response.json();

  return data;
}

const Page: React.FC<{ params: { slug: string } }> = async ({ params }) => {
  const slug = params.slug;
  let subMeals: SubMeal[] = [];
  let ingredients: Ingredient[] = [];
  let error: string | null = null;

  try {
    subMeals = await fetchSubMeals(slug);
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
        <SubMealsComponent
          initialSubMeals={subMeals}
          allIngredients={ingredients}
          smID={slug}
        />
      )}
    </div>
  );
};

export default Page;
