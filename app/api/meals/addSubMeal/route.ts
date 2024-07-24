import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {  addDoc, collection,  getDocs,  } from 'firebase/firestore';



export async function POST(request: Request) {
    const {smID,name,price} = await request.json()
    
    console.log('====================================');
    console.log("id, name, price", smID,name,price);
    console.log('====================================');
    try {

        const subMealsCollection = collection(db, "meals", smID, "sub-meals");
        const newMealRef = await addDoc(subMealsCollection, {
            name,
            price,
        });

        const newMeal = {
            id: newMealRef.id,
            name,
            price,
        };
        
        return NextResponse.json(newMeal, { status: 200 });


    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}