// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5u6X3mWpkgV0zVksMAh2Vu1kT1jLeiuQ",
  authDomain: "rn-defensa-civil.firebaseapp.com",
  projectId: "rn-defensa-civil",
  storageBucket: "rn-defensa-civil.appspot.com",
  messagingSenderId: "710626101858",
  appId: "1:710626101858:web:2765873e134c30fb059f3b",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);


