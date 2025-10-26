// backend/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account JSON synchronously
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "your-firebase-bucket-name.appspot.com", // replace with your bucket
  });
}

const bucket = admin.storage().bucket();

// Upload image to Firebase Storage
export async function uploadImageToFirebase(buffer, filename) {
  const file = bucket.file(`images/${Date.now()}-${filename}`);
  await file.save(buffer, {
    metadata: { contentType: "image/jpeg" },
  });
  return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
}

export default admin;
