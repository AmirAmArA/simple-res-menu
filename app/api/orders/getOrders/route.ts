import { NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { collection, getDocs, getDoc, doc, DocumentData, DocumentSnapshot } from 'firebase/firestore';

export async function GET() {
    try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
    
        for (const orderDoc of ordersSnapshot.docs) {
          const orderData = orderDoc.data();
          const customerRef = orderData.customer;
          const customerSnapshot = await getDoc(customerRef);
          const customer = customerSnapshot.data();
    
          if (!customer) {
            throw new Error(`Customer data not found for customerRef: ${customerRef.id}`);
          }
    
          const meals = await Promise.all(orderData.meals.map(async (mealOrder: any) => {
            const mealRef = mealOrder.meal;
            const mealSnapshot: DocumentSnapshot<DocumentData> = await getDoc(mealRef);
            const mealData = mealSnapshot.data();
    
            if (!mealData) {
              throw new Error(`Meal data not found for mealRef: ${mealRef.id}`);
            }
    
            return {
              ...mealData,
              id: mealSnapshot.id,
              quantity: mealOrder.quantity,
            };
          }));
    
          orders.push({
            id: orderDoc.id,
            customer: { ...customer, id: customerSnapshot.id },
            orderDate: orderData.orderDate,
            meals,
          });
        }
    
        return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}