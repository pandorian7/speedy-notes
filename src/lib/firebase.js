// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = !getApps().length ? initializeApp({
  apiKey: "AIzaSyDIF9rc7Ro0WTd8HgvR9cGF8MuQEsK2LH4",
  authDomain: "speedynotes-6ad90.firebaseapp.com",
  projectId: "speedynotes-6ad90",
  storageBucket: "speedynotes-6ad90.firebasestorage.app",
  messagingSenderId: "396593307244",
  appId: "1:396593307244:web:231158bd9abfc3a2fb8249",
  measurementId: "G-431Q6DHXJB"
}) : getApp();

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
