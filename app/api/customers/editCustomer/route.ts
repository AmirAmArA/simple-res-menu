import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { id, name, phone, address } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const customerDocRef = doc(db, "customers", id);

    const updateData: Partial<Record<string, any>> = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    await updateDoc(customerDocRef, updateData);

    return NextResponse.json({ message: "Customer updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating customer:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}