const admin = require("firebase-admin");

// initialize once in your backend (make sure you have serviceAccountKey.json)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../firebase-key.json")),
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
    req.user = decoded; // save user info for later use
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
