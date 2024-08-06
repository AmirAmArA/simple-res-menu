import { NextResponse } from "next/server";
import { db } from "../../../../firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const orders = [];

    for (const orderDoc of ordersSnapshot.docs) {
      const orderData = orderDoc.data();

      orders.push({
        id: orderDoc.id,
        ...orderData,
      });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
