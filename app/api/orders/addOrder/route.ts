import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../firebase/firebaseClient";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { customer, delivery, orderDate, amountPaid, status, meals, notes } =
      await req.json();

    // Validate the input fields
    if (!customer) {
      return NextResponse.json(
        { error: "Customer is required" },
        { status: 400 }
      );
    }

    if (delivery === undefined || delivery === null) {
      return NextResponse.json(
        { error: "Delivery status is required" },
        { status: 400 }
      );
    }

    if (!orderDate) {
      return NextResponse.json(
        { error: "Order date is required" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Order status is required" },
        { status: 400 }
      );
    }

    if (!meals || meals.length === 0) {
      return NextResponse.json(
        { error: "At least one meal is required" },
        { status: 400 }
      );
    }

    // Ensure notes is an empty string if not provided
    const sanitizedNotes = notes || "";

    const ordersCollection = collection(db, "orders");
    const newOrder = {
      customer,
      delivery,
      orderDate,
      status,
      meals,
      notes: sanitizedNotes,
    };

    const docRef = await addDoc(ordersCollection, newOrder);
    return NextResponse.json({ id: docRef.id, ...newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error adding order:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
