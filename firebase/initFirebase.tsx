// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getMetadata,
  listAll,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSoC2lovJ_C5bGgoJx9_eet2yLH9n7NA4",
  authDomain: "resturant-menu-a5079.firebaseapp.com",
  projectId: "resturant-menu-a5079",
  storageBucket: "resturant-menu-a5079.appspot.com",
  messagingSenderId: "208265470992",
  appId: "1:208265470992:web:2ce8a053fd41521793d695",
  measurementId: "G-Z6MNZ0NKC8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getStorage(app);
export const dbFS = getFirestore(app);

const addons = [
  { name: "جزر" }, // Carrot
  { name: "خيار" }, // Cucumber
  { name: "افوكادو" }, // Avocado
  { name: "جبنة شمينت" }, // Sour Cheese
  { name: "جبنة صفرا" }, // Yellow Cheese
  { name: "قريدس" }, // Shrimp
  { name: "بطاطا حلوة" }, // Sweet Potato
  { name: "سلمون" }, // Salmon
  { name: "بصل اخضر" }, // Green Onion
  { name: "سلمون طازج ني" }, // Fresh Raw Salmon
  { name: "فول صويا مسلوق" }, // Boiled Soybeans
  { name: "ملح خشن" }, // Coarse Salt
  { name: "حامض" }, // Lemon
  { name: "فقع شيتاكي" }, // Shiitake Mushrooms
  { name: "فلفل حار" }, // Hot Pepper
  { name: "كراب بالتمبورا" }, // Tempura Crab
];

export async function addAddons() {
  try {
    for (const addon of addons) {
      const docRef = await addDoc(collection(dbFS, "ingredients"), addon);
      console.log(`Addon added with ID: ${docRef.id} for ${addon.name}`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function getIngredientRefs(ingredientNames: string[]) {
  const ingredientRefs = [];
  for (const name of ingredientNames) {
    const q = query(collection(dbFS, "ingredients"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      ingredientRefs.push(doc(dbFS, "ingredients", querySnapshot.docs[0].id));
    } else {
      console.log(`No ingredient found with the name ${name}`);
    }
  }
  return ingredientRefs;
}

export async function addMeal(name: string, ingredientNames: string[]) {
  const ingredientRefs = await getIngredientRefs(ingredientNames);

  const mealRef = await addDoc(collection(dbFS, "meals"), {
    name: name,
    ingredients: ingredientRefs,
  });

  console.log(`Meal added with ID: ${mealRef.id}`);
}

export async function fetchAndExpandMeals() {
  const mealsSnapshot = await getDocs(collection(dbFS, "meals"));
  for (const mealDoc of mealsSnapshot.docs) {
    const mealData = mealDoc.data();
    console.log(`Meal Name: ${mealData.name}`);

    // Expand ingredient references
    const ingredientsData = await Promise.all(
      mealData.ingredients.map((ingredientRef: DocumentReference) =>
        getDoc(ingredientRef).then((doc) => doc.data())
      )
    );

    console.log("Ingredients:");
    ingredientsData.forEach((ingredient, index) => {
      console.log(`${index + 1}. ${ingredient.name}`);
    });
  }
}

// export async function addIngredient(name: string) {
//   const ingredientRef = await setDoc(doc(collection(dbFS, "ingredients")), {
//     name: name,
//   });
//   console.log(ingredientRef);
//   return ingredientRef;
// }

// addIngredient("جبنة صفراء");

// export const listDirs = () => {
//   const dbRef = ref(db, "test");

//   listAll(dbRef)
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {
//         // All the prefixes under listRef.
//         // You may call listAll() recursively on them.
//       });
//       res.items.forEach((itemRef) => {
//         console.log("====================================");
//         console.log(itemRef);
//         console.log("====================================");
//       });
//     })
//     .catch((error) => {
//       console.error("error: ", error);
//     });
// };
