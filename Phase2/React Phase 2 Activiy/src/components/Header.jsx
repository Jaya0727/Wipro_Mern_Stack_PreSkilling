import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((data) => {
        const totalQty = data.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalQty);
      });
  }, []);

  return (
    <header className="w-full">
      {/* Top navigation */}
      <div className="bg-gray-600 text-white text-sm py-2 px-6 flex justify-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/customer-service"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }
        >
          Customer Service
        </NavLink>
      </div>

      {/* Main header */}
      <div className="bg-yellow-500 px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-4xl font-bold text-white">
          Eflyer
        </NavLink>

        <NavLink
          to="/cart"
          className="text-white font-semibold hover:underline"
        >
          Cart ({cartCount})
        </NavLink>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <input
          type="text"
          placeholder="Search this blog"
          className="w-full px-4 py-2 rounded text-black outline-none"
        />
      </div>
    </header>
  );
};

export default Header;