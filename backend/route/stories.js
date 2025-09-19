// backend/routes/stories.js
const express = require("express");
const router = express.Router();
const admin = require("../firebaseAdmin"); // ✅ import admin properly
const verifyToken = require("../middleware/verifyToken");

const db = admin.firestore();

// 📖 GET /api/stories -> fetch all stories
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("stories")
      .orderBy("createdAt", "desc")
      .get();

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// 📖 GET /api/stories/:id -> fetch single story
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("stories").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("Error fetching story:", err);
    res.status(500).json({ error: "Failed to fetch story" });
  }
});

// ➕ POST /api/stories -> add story (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { artisan, story } = req.body;

    if (!artisan || !story) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await db.collection("stories").add({
      artisan,
      story,
      userId: req.user.uid, // ✅ who created the story
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Error adding story:", err);
    res.status(500).json({ error: "Failed to add story" });
  }
});

module.exports = router;
