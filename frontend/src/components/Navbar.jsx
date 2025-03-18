import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/">E-Commerce</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  );
};

export default Navbar;
