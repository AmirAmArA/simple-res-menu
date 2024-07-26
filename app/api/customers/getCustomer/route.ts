import { NextResponse, NextRequest } from "next/server";
import { db } from '../../../../firebase/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    
    if (!id) {
        return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    try {
        const docRef = doc(db, "customers", id);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        const customer = {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };

        return NextResponse.json(customer, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
          { error: (error as Error).message },
          { status: 500 }
        );
    }
}