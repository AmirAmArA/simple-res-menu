import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const customersCollection = collection(db, "customers");
    const querySnapshot = await getDocs(customersCollection);

    const customers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    
    return NextResponse.json(customers, { status: 200 });

  } catch (error) {
    console.error("Error fetching customers:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}