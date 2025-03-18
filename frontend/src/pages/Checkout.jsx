import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axiosInstance";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/checkout", { items: cart });
      window.location.href = response.data.url;
      dispatch(clearCart());
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout} className="bg-blue-500 text-white p-2">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
