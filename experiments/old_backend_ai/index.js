<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 Firebase Admin SDK (init only once)
if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, "firebase-key.json"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// 🔒 Middleware
const verifyToken = require("./middleware/verifyToken");

// ✅ Health Check
=======
// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import admin, { uploadImageToFirebase } from "./firebaseAdmin.js"; // initializes Firebase Admin
import productsRoutes from "./routes/products.js";
import storiesRoutes from "./routes/stories.js";
import translateRoutes from "./routes/translate.js";

dotenv.config();

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json()); // replaces body-parser.json()

// 🩺 Health Check
>>>>>>> afef4b95e756751136f860be3e5cbe299875fea1
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend + Firebase is running 🚀" });
});

<<<<<<< HEAD

// ========================== PRODUCTS ==========================

// 📦 Get all products
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ➕ Add product (protected)
app.post("/api/products", verifyToken, async (req, res) => {
  const { name, price, artisan } = req.body;
  if (!name || !price || !artisan) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("products").add({
      name,
      price,
      artisan,
      userId: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("❌ Add product error:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});


// ========================== STORIES ==========================

// ➕ Add story
app.post("/api/stories", verifyToken, async (req, res) => {
  const { artisan, story } = req.body;
  if (!artisan || !story) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const docRef = await db.collection("stories").add({
      artisan,
      story,
      userId: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("❌ Add story error:", err);
    res.status(500).json({ error: "Failed to add story" });
  }
});

// 📖 Get all stories
app.get("/api/stories", async (req, res) => {
  try {
    const snapshot = await db.collection("stories").orderBy("createdAt", "desc").get();
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(stories);
  } catch (err) {
    console.error("❌ Fetch stories error:", err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});


// ========================== TRANSLATION ==========================

const USE_GOOGLE = process.env.USE_GOOGLE_TRANSLATE === "true";

let googleTranslateClient = null;
if (USE_GOOGLE) {
  try {
    const { Translate } = require("@google-cloud/translate").v2;
    googleTranslateClient = new Translate();
    console.log("✅ Using Google Cloud Translate");
  } catch (e) {
    console.warn("⚠️ Google Translate client failed, using LibreTranslate. Error:", e.message);
  }
}

const translationCache = new Map();

const SUPPORTED_LANGS = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

// 🌍 Supported languages
app.get("/api/translate/langs", (req, res) => {
  res.json(SUPPORTED_LANGS);
});

// 🌍 Translate endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) {
      return res.status(400).json({ error: "text and targetLang required" });
    }

    const cacheKey = `${text}::${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return res.json({ translatedText: translationCache.get(cacheKey), cached: true });
    }

    let translatedText;
    if (USE_GOOGLE && googleTranslateClient) {
      const [translation] = await googleTranslateClient.translate(text, targetLang);
      translatedText = translation;
    } else {
      const resp = await axios.post(
        "https://libretranslate.de/translate",
        { q: text, source: "auto", target: targetLang, format: "text" },
        { headers: { accept: "application/json" } }
      );
      translatedText = resp.data.translatedText;
    }

    translationCache.set(cacheKey, translatedText);
    res.json({ translatedText });
  } catch (err) {
    console.error("❌ Translation error:", err?.message || err);
    res.status(500).json({ error: "Translation failed", details: err?.message });
  }
});


// ========================== START SERVER ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
=======
// 📦 API Routes
app.use("/api/products", productsRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/translate", translateRoutes);

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
>>>>>>> afef4b95e756751136f860be3e5cbe299875fea1
