import fs from "fs";
import vision from "@google-cloud/vision";
import OpenAI from "openai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { removeBackground } = require("@imgly/background-removal-node");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./google-credentials.json", // put this file in backend/
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeArtisanImage(imagePath) {
  // 1. Clean background
  const result = await removeBackground(imagePath);
  const outputPath = imagePath.replace(".jpg", "-cleaned.png");
  fs.writeFileSync(outputPath, Buffer.from(result, "base64"));

  // 2. Describe the item using Google Vision
  const [detection] = await client.labelDetection(outputPath);
  const labels = detection.labelAnnotations.map((x) => x.description).join(", ");

  // 3. Generate pricing suggestion using AI
  const prompt = `You are an art pricing expert. Suggest a fair price range for an item with these features: ${labels}`;
  const gpt = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    cleanedImage: outputPath,
    labels,
    pricing: gpt.choices[0].message.content,
  };
}
