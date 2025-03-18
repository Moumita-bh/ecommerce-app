const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Stripe = require("stripe");

const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Stripe Checkout Route
app.post("/api/checkout", async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title },
          unit_amount: item.price * 100
        },
        quantity: 1
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

