// backend/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";

// ⚠️ Make sure you downloaded your service account key JSON from Firebase Console
const serviceAccountPath = path.resolve("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export default admin;
