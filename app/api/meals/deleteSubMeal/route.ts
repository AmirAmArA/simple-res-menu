import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {   deleteDoc, doc } from 'firebase/firestore';



export async function POST(request: Request) {
    const {smID, mealToDelete} = await request.json()
    try {

        const subMealsCollection = doc(db, "meals", smID, "sub-meals",mealToDelete);
         await deleteDoc(subMealsCollection);


        
        return NextResponse.json({message:"Meal Was Deleted"}, { status: 200 });


    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}