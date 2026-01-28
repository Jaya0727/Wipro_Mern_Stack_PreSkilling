import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import cartStore from "../flux/stores/CartStore";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  //  Cart count (Flux)
  const [cartCount, setCartCount] = useState(0);

  //  Theme context
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Sync cart count with Flux store
  useEffect(() => {
    const updateCartCount = () => {
      const cart = cartStore.getCart();
      const totalQty = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalQty);
    };

    updateCartCount();
    cartStore.addChangeListener(updateCartCount);

    return () => {
      cartStore.removeChangeListener(updateCartCount);
    };
  }, []);

  return (
    <header className="w-full">
      {/* 🔹 TOP NAVIGATION */}
      <div
        className={`text-white text-sm py-2 px-4 flex flex-wrap justify-center gap-4 transition-colors duration-300
          ${theme === "light" ? "bg-gray-600" : "bg-black"}
        `}
      >
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

      {/* MAIN HEADER */}
      <div
        className={`px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300
          ${theme === "light" ? "bg-yellow-500" : "bg-gray-900"}
        `}
      >
        <NavLink to="/" className="text-3xl sm:text-4xl font-bold text-white">
          Eflyer
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink
            to="/cart"
            className="text-white font-semibold hover:underline"
          >
            Cart ({cartCount})
          </NavLink>

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-black text-white hover:bg-gray-700 transition"
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* 🔹 SEARCH BAR */}
      <div
        className={`px-6 pb-4 transition-colors duration-300
          ${theme === "light" ? "bg-white" : "bg-gray-900"}
        `}
      >
        <input
          type="text"
          placeholder="Search this blog"
          className={`w-full px-4 py-2 rounded outline-none
            ${theme === "light"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"}
          `}
        />
      </div>
    </header>
  );
};

export default Header;