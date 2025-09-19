// backend/firebaseAdmin.js
const admin = require("firebase-admin");
const path = require("path");

if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json")); // 🔑 your Firebase key
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
