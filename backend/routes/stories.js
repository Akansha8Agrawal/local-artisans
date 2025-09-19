import express from "express";
import multer from "multer";
import admin, { uploadImageToFirebase } from "../firebaseAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { speechToText } from "../ai/speech.js";
import { generateStoryWithGemini } from "../ai/gemini.js";

const router = express.Router();
const db = admin.firestore();

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET /api/stories -> fetch all stories */
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

/* GET /api/stories/:id -> fetch single story by id */
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

/* POST /api/stories -> create story (protected) */
router.post(
  "/",
  verifyToken,
  upload.fields([{ name: "image" }, { name: "audio" }]),
  async (req, res) => {
    try {
      const imageFile = req.files?.image?.[0] || null;
      const audioFile = req.files?.audio?.[0] || null;

      let rawText = req.body.story || "";
      if (audioFile) {
        rawText = await speechToText(audioFile.buffer);
      }

      if (!rawText.trim()) {
        return res.status(400).json({ error: "No story content provided" });
      }

      const aiResult = await generateStoryWithGemini(rawText);

      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(
          imageFile.buffer,
          imageFile.originalname
        );
      }

      const docRef = await db.collection("stories").add({
        artisan: req.user.name || "Unknown",
        title: aiResult.title,
        story: aiResult.story,
        hashtags: aiResult.hashtags,
        imageUrl,
        userId: req.user.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(201).json({ success: true, id: docRef.id });
    } catch (err) {
      console.error("Error adding story:", err);
      res.status(500).json({ error: "Failed to add story" });
    }
  }
);

export default router;
