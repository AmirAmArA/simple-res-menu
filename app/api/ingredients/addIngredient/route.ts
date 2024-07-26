import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {  addDoc, collection,  getDocs,  } from 'firebase/firestore';



export async function POST(request: Request) {
    const {name} = await request.json()
    try {

        const ingredientsCollection = collection(db, "ingredients");
        const newIngredientRef = await addDoc(ingredientsCollection, {
            name,
        });

        const newIngredient = {
            id: newIngredientRef.id,
            name,
        };
        
        return NextResponse.json(newIngredient, { status: 200 });


    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}