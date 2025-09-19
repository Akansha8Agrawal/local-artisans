const admin = require("firebase-admin");
const path = require("path");

// initialize Firebase Admin once
if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, "../firebase-key.json"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // user info (uid, email, etc.)
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
