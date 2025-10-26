import admin from "../firebaseAdmin.js";

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
