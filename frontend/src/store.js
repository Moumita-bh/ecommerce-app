import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Ensure cartSlice.js exists

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
