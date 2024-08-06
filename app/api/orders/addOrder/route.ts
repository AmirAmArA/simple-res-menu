import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../firebase/firebaseClient';
import { collection, addDoc } from 'firebase/firestore';
import { Order } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const {  customer, delivery, orderDate, amountPaid, status, meals, notes } = await req.json();

    if ( !customer || !delivery || !orderDate || !status || !meals || !notes) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const ordersCollection = collection(db, "orders");
    const newOrder = {
      customer,
      delivery,
      orderDate,
      status,
      meals,
      notes,
    };

    const docRef = await addDoc(ordersCollection, newOrder);
    return NextResponse.json({  ...newOrder,docRef }, { status: 201 });

  } catch (error) {
    console.error("Error adding order:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}