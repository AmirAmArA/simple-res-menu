import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { doc, updateDoc } from 'firebase/firestore';



export async function POST(request: Request) {
    const { smID, mealToEdit, name, price } = await request.json();
    try {

        const subMealDoc = doc(db, "meals", smID, "sub-meals", mealToEdit);
        await updateDoc(subMealDoc, {
          name,
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