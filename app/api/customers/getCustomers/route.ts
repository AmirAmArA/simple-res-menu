import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limitValue = parseInt(searchParams.get('limit') || '10');
    const startAfterDoc = searchParams.get('startAfter') || null;
    const searchText = searchParams.get('searchText') || null;

    const customersCollection = collection(db, "customers");
    let baseQuery;

    if (searchText) {
      baseQuery = query(
        customersCollection,
        where('phone', '>=', searchText),
        where('phone', '<=', searchText + '\uf8ff'),
        orderBy('phone'),
        limit(limitValue)
      );
    } else {
      baseQuery = query(customersCollection, orderBy('phone'), limit(limitValue));
    }

    let customerQuery;
    if (startAfterDoc) {
      const lastVisibleDocRef = doc(db, 'customers', startAfterDoc);
      const lastVisibleDocSnapshot = await getDoc(lastVisibleDocRef);
      customerQuery = query(baseQuery, startAfter(lastVisibleDocSnapshot));
    } else {
      customerQuery = baseQuery;
    }
    
    const querySnapshot = await getDocs(customerQuery);
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    const customers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const response = {
      customers,
      lastVisibleDoc: lastVisibleDoc ? lastVisibleDoc.id : null,
      hasMore: querySnapshot.docs.length === limitValue,
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("Error fetching customers:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}