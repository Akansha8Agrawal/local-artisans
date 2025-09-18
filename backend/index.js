// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy products
const products = [
  { id: 1, name: "Handwoven Banarasi Saree", price: 6000, artisan: "Sita Devi" },
  { id: 2, name: "Bamboo Basket", price: 500, artisan: "Ramesh Kumar" },
  { id: 3, name: "Terracotta Pot", price: 800, artisan: "Anita Sharma" }
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Dummy stories
const stories = [
  { id: 1, artisan: "Sita Devi", story: "I have been weaving sarees for 20 years..." },
  { id: 2, artisan: "Ramesh Kumar", story: "My family has crafted bamboo baskets for generations." }
];

// GET all stories
app.get("/api/stories", (req, res) => {
  res.json(stories);
});

// Mock upload endpoint
app.post("/api/upload", (req, res) => {
  // later: connect to Firebase Storage / GCS
  res.json({ success: true, url: "https://dummyimage.com/300.png/09f/fff" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
