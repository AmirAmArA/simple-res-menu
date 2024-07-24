import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import {  collection,  getDocs } from 'firebase/firestore';



export async function GET(request: Request) {
    try {
        const q = collection(db, "meals");
        const querySnapshot = await getDocs(q);
        const mealTypes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            type: doc.data().type
        }));

        return NextResponse.json(mealTypes, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
     
    }
}