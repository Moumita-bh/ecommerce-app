import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 m-2">
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
