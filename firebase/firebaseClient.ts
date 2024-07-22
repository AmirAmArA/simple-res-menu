import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSoC2lovJ_C5bGgoJx9_eet2yLH9n7NA4",
    authDomain: "resturant-menu-a5079.firebaseapp.com",
    projectId: "resturant-menu-a5079",
    storageBucket: "resturant-menu-a5079.appspot.com",
    messagingSenderId: "208265470992",
    appId: "1:208265470992:web:2ce8a053fd41521793d695",
    measurementId: "G-Z6MNZ0NKC8",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
