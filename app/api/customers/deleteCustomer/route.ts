import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { doc, deleteDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const customerDocRef = doc(db, "customers", id);

    await deleteDoc(customerDocRef);

    return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting customer:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}