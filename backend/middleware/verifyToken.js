// backend/middleware/verifyToken.js
import admin from "../firebaseAdmin.js";

// Middleware to verify Firebase token
export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // user info (uid, email, etc.)
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
