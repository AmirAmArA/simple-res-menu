import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {  collection,  getDocs,  } from 'firebase/firestore';



export async function POST(request: Request) {
    const {id} = await request.json()
    try {
        const subMealsCollection = collection(db, "meals", id, "sub-meals");
        const querySnapshot = await getDocs(subMealsCollection);
        const subMeals = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price
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