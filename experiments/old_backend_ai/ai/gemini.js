// backend/ai/gemini.js

// 📝 Dummy AI story generator: just returns fake story content
export async function generateStoryWithGemini(rawText) {
  console.log("generateStoryWithGemini called with text:", rawText);
  return {
    title: "My AI Story",
    story: `Once upon a time... ${rawText}`,
    hashtags: ["#story", "#ai", "#fun"]
  };
}
