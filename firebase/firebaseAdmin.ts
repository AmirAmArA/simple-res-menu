import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();

export { admin, adminDb };
