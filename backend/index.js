// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import admin, { uploadImageToFirebase } from "./firebaseAdmin.js"; // initializes Firebase Admin
import productsRoutes from "./routes/products.js";
import storiesRoutes from "./routes/stories.js";
import translateRoutes from "./routes/translate.js";
import authRoutes from "./routes/auth.js";
import imageRoutes from "./routes/imageroute.js";



dotenv.config();

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json()); // replaces body-parser.json()

// 🩺 Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend + Firebase is running 🚀" });
});

// 📦 API Routes
app.use("/api/products", productsRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);



// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
