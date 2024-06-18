import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import serviceAccountKey from "./serviceAccountKey.json" with { type: "json" };
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const serviceAccount = serviceAccountKey;

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

export { db };
