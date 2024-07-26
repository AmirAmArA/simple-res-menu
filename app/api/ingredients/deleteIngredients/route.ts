import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {   collection, deleteDoc, doc } from 'firebase/firestore';



export async function POST(request: Request) {
    const { id:ingredientToDelete} = await request.json()
    try {

        const ingredientCollection = doc(db, "ingredients",ingredientToDelete);
         await deleteDoc(ingredientCollection);


        
        return NextResponse.json({message:"ingredient Was Deleted"}, { status: 200 });


    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}