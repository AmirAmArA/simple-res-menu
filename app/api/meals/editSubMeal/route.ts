import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { doc, DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';
import { Ingredient } from "@/types";



export async function POST(request: Request) {
  const { smID, mealToEdit, name, price, ingredients } = await request.json();
  
    try {

      const subMealDoc = doc(db, "meals", smID, "sub-meals", mealToEdit);
      
      const ingredientRefs: DocumentReference<DocumentData>[] = Array.isArray(ingredients)
      ? ingredients.map((ingredient: Ingredient) => doc(db, "ingredients", ingredient.id))
      : [];
      
        await updateDoc(subMealDoc, {
          name,
         ingredients: ingredientRefs,
          price,
        });
    
        return NextResponse.json({ message: "Meal was updated successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}