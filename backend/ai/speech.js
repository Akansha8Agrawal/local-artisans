// backend/ai/speech.js

// 📝 Dummy speech-to-text: just returns a fake string
export async function speechToText(buffer) {
  console.log("speechToText called with audio buffer of length:", buffer?.length);
  return "This is a dummy transcribed text from the audio.";
}
