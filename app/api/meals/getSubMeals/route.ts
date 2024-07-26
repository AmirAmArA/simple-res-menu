import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { collection, getDocs, doc, getDoc, DocumentData, DocumentReference } from 'firebase/firestore';
import { Ingredient, SubMeal } from "@/types";



export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const subMealsCollection = collection(db, "meals", id, "sub-meals");
    const querySnapshot = await getDocs(subMealsCollection);

    const subMeals: SubMeal[] = await Promise.all(querySnapshot.docs.map(async (subMealDoc) => {
      const data = subMealDoc.data();
      const ingredientRefs = data.ingredients || []; // Handle empty or non-existent ingredients field

      const ingredients: Ingredient[] = await Promise.all(ingredientRefs.map(async (ref: DocumentReference<DocumentData>) => {
        const ingredientDoc = await getDoc(ref);
        return { id: ingredientDoc.id, name: ingredientDoc.data()?.name || "Unknown" };
      }));

      return {
        id: subMealDoc.id,
        name: data.name,
        ingredients,
        price: data.price
      };
    }));

    return NextResponse.json(subMeals, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}