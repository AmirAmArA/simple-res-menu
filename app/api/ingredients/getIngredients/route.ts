import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {  collection,  getDocs } from 'firebase/firestore';



export async function GET(request: Request) {
    try {
        const q = collection(db, "ingredients");
        const querySnapshot = await getDocs(q);
        const ingredients = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }));

        return NextResponse.json(ingredients, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}