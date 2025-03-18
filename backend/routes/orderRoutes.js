const express = require("express");
const Order = require("../models/Order.js");

const router = express.Router();

// ✅ Fetch User Orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

// ✅ Place an Order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount, paymentStatus: "Pending" });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
});

module.exports = router;
