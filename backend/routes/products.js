import express from "express";
import admin from "../firebaseAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
const db = admin.firestore();

// GET /api/products -> fetch all products
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products -> add new product (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, price, artisan } = req.body;

    if (!name || !price || !artisan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await db.collection("products").add({
      name,
      price,
      artisan,
      userId: req.user.uid, // user who created it
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

export default router;
