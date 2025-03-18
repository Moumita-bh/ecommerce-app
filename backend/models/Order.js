const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  totalAmount: Number,
  paymentStatus: String
});

module.exports = mongoose.model("Order", orderSchema);
