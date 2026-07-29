import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyCARQxYMwfbRIhB9NvhqfUuaqM3oCiTA3g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "wedding-project-24561.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "wedding-project-24561",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "wedding-project-24561.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "873670578072",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:873670578072:web:543dd9d7152f06d23225ed",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-JBJSKTPHFG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
