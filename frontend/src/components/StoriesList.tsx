// frontend/src/components/StoriesList.tsx
import React, { useState } from "react";
import { translateText, fetchTranslateLangs } from "../apiHelpers";

interface Story {
  id: string;
  artisan: string;
  story: string;
  createdAt?: { _seconds?: number } | string;
}

interface StoriesListProps {
  stories: Story[];
}

const DEFAULT_LANGS = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "es", name: "Spanish" },
];

const StoryItem: React.FC<{ s: Story }> = ({ s }) => {
  const [lang, setLang] = useState("en");
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!s.story) return;
    setLoading(true);
    try {
      const t = await translateText(s.story, lang);
      setTranslated(t);
    } catch (err) {
      console.error("Translate failed", err);
      alert("Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const timeLabel = s.createdAt && (s.createdAt as any)._seconds
    ? new Date((s.createdAt as any)._seconds * 1000).toLocaleString()
    : (typeof s.createdAt === "string" ? s.createdAt : "Just now");

  return (
    <li
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <strong>{s.artisan}</strong>
      </div>

      <div style={{ marginBottom: 8 }}>{s.story}</div>

      <small className="text-gray-500">{timeLabel}</small>

      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          {DEFAULT_LANGS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleTranslate}
          disabled={loading}
          style={{
            padding: "6px 10px",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {/* Play original or translated using Web Speech API */}
        <button
          onClick={() => {
            const textToSpeak = translated || s.story;
            const utter = new SpeechSynthesisUtterance(textToSpeak);
            // lang for TTS: map small set
            utter.lang = lang === "hi" ? "hi-IN" : lang === "bn" ? "bn-BD" : (lang === "ta" ? "ta-IN" : (lang === "es" ? "es-ES" : "en-US"));
            speechSynthesis.speak(utter);
          }}
          style={{
            padding: "6px 10px",
            backgroundColor: "#10b981",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          🔊 Listen
        </button>
      </div>

      {translated && (
        <div style={{ marginTop: 10, padding: 8, backgroundColor: "#fff", borderRadius: 6 }}>
          <strong>Translated ({lang}):</strong>
          <div style={{ marginTop: 6 }}>{translated}</div>
        </div>
      )}
    </li>
  );
};

const StoriesList: React.FC<StoriesListProps> = ({ stories }) => {
  if (!stories || stories.length === 0) return <p>No stories yet. Be the first to share ✍️</p>;

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {stories.map((s) => (
        <StoryItem key={s.id} s={s} />
      ))}
    </ul>
  );
};

export default StoriesList;
