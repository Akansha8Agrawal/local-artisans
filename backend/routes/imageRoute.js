import express from "express";
import multer from "multer";
import { analyzeArtisanImage } from "../ai/imageProcessor.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const result = await analyzeArtisanImage(req.file.path);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

export default router;
