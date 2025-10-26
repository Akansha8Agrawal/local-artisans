import express from "express";
import admin from "../firebaseAdmin.js";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { uid, email, displayName } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) user = await User.create({ uid, email, displayName });

    const customToken = await admin.auth().createCustomToken(uid);
    res.status(201).json({ user, token: customToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const customToken = await admin.auth().createCustomToken(uid);
    res.json({ user, token: customToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
