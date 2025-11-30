// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsUpbM7GsLBdSAxAmN7P2mO29lDrmgork",
  authDomain: "moodmap-b8d53.firebaseapp.com",
  projectId: "moodmap-b8d53",
  storageBucket: "moodmap-b8d53.firebasestorage.app",
  messagingSenderId: "30151537998",
  appId: "1:30151537998:web:6b2d0bd0e876941c541a1f",
  measurementId: "G-MLRXSY9L57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);