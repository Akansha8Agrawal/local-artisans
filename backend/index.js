// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Firebase Admin SDK (init once, globally available)
const admin = require("./firebaseAdmin");

// ✅ Routes
const productsRoutes = require("./route/products");
const storiesRoutes = require("./route/stories");
const translateRoutes = require("./route/translate");

// ✅ Health Check
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", message: "Backend + Firebase is running 🚀" })
);

// ✅ Mount routes
app.use("/api/products", productsRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/translate", translateRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
