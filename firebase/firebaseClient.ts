import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const serviceAccount = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT || "{}"
);

const app = initializeApp(serviceAccount);
const db = getFirestore(app);

export { db };
