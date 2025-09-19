const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// Example in-memory / DB
let products = [];

router.post("/", verifyToken, (req, res) => {
  const { name, price, artisan } = req.body;

  if (!name || !price || !artisan) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    artisan,
    createdBy: req.user.uid, // ✅ now we know who added this
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
