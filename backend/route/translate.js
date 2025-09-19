// backend/routes/translate.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const USE_GOOGLE = process.env.USE_GOOGLE_TRANSLATE === "true";

let googleTranslateClient = null;
if (USE_GOOGLE) {
  try {
    const { Translate } = require("@google-cloud/translate").v2;
    googleTranslateClient = new Translate();
    console.log("✅ Using Google Cloud Translate");
  } catch (e) {
    console.warn("⚠️ Google Translate client init failed, falling back to LibreTranslate:", e.message);
  }
}

// small in-memory cache
const translationCache = new Map();

// Supported languages
const SUPPORTED_LANGS = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

// 🌍 Get supported langs
router.get("/langs", (req, res) => {
  res.json(SUPPORTED_LANGS);
});

// 🌍 Translate text
router.post("/", async (req, res) => {
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
        {
          q: text,
          source: "auto",
          target: targetLang,
          format: "text",
        },
        { headers: { accept: "application/json" } }
      );
      translatedText = resp.data.translatedText;
    }

    translationCache.set(cacheKey, translatedText);
    res.json({ translatedText });
  } catch (err) {
    console.error("Translation error:", err?.message || err);
    res.status(500).json({ error: "Translation failed", details: err?.message });
  }
});

module.exports = router;
