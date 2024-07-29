import { NextResponse,NextRequest } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { collection, addDoc } from 'firebase/firestore';
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest) {
  try {
    const { name, phone, address } = await req.json();

    if (!name || !phone || !address) {
      return NextResponse.json({ error: "Name, phone, and address are required" }, { status: 400 });
    }

    const customersCollection = collection(db, "customers");
    const newCustomer = {
      name,
      phone,
      address,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(customersCollection, newCustomer);
    return NextResponse.json({ id: docRef.id, ...newCustomer }, { status: 201 });

  } catch (error) {
    console.error("Error adding customer:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}