const express = require("express");
const Product = require("../models/Product.js");

const router = express.Router();

// ✅ Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// ✅ Add a Product
router.post("/", async (req, res) => {
  try {
    const { title, image, price } = req.body;
    const newProduct = new Product({ title, image, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

module.exports = router;
