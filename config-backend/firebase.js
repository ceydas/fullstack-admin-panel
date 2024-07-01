import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();
const config = process.env.FIREBASE_PROJECT_ID;
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
// Initialize Firebase
admin.initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = getFirestore();

export { db };
