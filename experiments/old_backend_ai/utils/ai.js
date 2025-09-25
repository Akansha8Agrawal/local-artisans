// backend/utils/ai.js
module.exports = {
  async speechToText(audioUrl) {
    console.log("speechToText placeholder called for:", audioUrl);
    // return a stub; replace with Vertex Speech-to-Text call
    return "Transcribed text from audio (stub)";
  },

  async enhanceImage(imageUrl) {
    console.log("enhanceImage placeholder called for:", imageUrl);
    // return enhanced image URL stub
    return imageUrl;
  },

  async generateListingFromText(text) {
    console.log("generateListingFromText placeholder:", text);
    return {
      title: text.slice(0, 50) + "...",
      description: "AI generated description (stub)",
      hashtags: ["#handmade", "#local"],
      suggestedPrice: 999,
    };
  },

  // Add more helpers when you integrate Vertex/Gemini
};
