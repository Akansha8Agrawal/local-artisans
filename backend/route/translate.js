// Add near top of your backend/index.js
const axios = require('axios');

// --- Translation setup ---
const USE_GOOGLE = process.env.USE_GOOGLE_TRANSLATE === 'true';

// Optional: if using Google Translate, make sure GOOGLE_APPLICATION_CREDENTIALS points to your service-account json.
// The google client will pick that up automatically.
let googleTranslateClient = null;
if (USE_GOOGLE) {
  try {
    const {Translate} = require('@google-cloud/translate').v2;
    googleTranslateClient = new Translate(); // uses GOOGLE_APPLICATION_CREDENTIALS
    console.log('Using Google Cloud Translate');
  } catch (e) {
    console.warn('Google Translate client failed to load, falling back to LibreTranslate. Error:', e.message);
  }
}

// small in-memory cache for demo purposes
const translationCache = new Map();

// Static languages (you can expand)
const SUPPORTED_LANGS = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' }
];

// GET supported languages
app.get('/api/translate/langs', (req, res) => {
  res.json(SUPPORTED_LANGS);
});

// POST /api/translate { text, targetLang }
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) return res.status(400).json({ error: 'text and targetLang required' });

    const cacheKey = `${text}::${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return res.json({ translatedText: translationCache.get(cacheKey), cached: true });
    }

    let translatedText;

    if (USE_GOOGLE && googleTranslateClient) {
      // Google Cloud Translate
      const [translation] = await googleTranslateClient.translate(text, targetLang);
      translatedText = translation;
    } else {
      // Fallback: LibreTranslate public instance (good for demo)
      // NOTE: LibreTranslate is rate-limited and sometimes offline; for production use Google Translate or another paid API.
      const resp = await axios.post('https://libretranslate.de/translate', {
        q: text,
        source: 'auto',
        target: targetLang,
        format: 'text'
      }, {
        headers: { 'accept': 'application/json' }
      });
      translatedText = resp.data.translatedText;
    }

    // cache small results in-memory for demo
    translationCache.set(cacheKey, translatedText);

    res.json({ translatedText });
  } catch (err) {
    console.error('Translation error:', err?.message || err);
    res.status(500).json({ error: 'Translation failed', details: err?.message });
  }
});
