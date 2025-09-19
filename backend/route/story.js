const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
let stories = [];

// ➕ Add story
router.post("/", verifyToken, (req, res) => {
  const { artisan, story } = req.body;

  if (!artisan || !story) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newStory = {
    id: stories.length + 1,
    artisan,
    story,
    createdBy: req.user.uid, // ✅ Firebase UID
  };

  stories.push(newStory);
  res.status(201).json(newStory);
});

// 📖 Get all stories
router.get("/", (req, res) => {
  res.json(stories);
});

module.exports = router;
