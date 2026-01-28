import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Productlist from "./Pages/Productlist";
import Productdetails from "./Pages/Productdetails";
import CustomerService from "./Pages/CustomerService";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";

import { CartActions } from "./flux/actions/CartActions";

//  Separate component for routes (needed for AnimatePresence)
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/products/:id" element={<Productdetails />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {

  // ✅ Rehydrate Flux cart from backend on app load / refresh
  useEffect(() => {
    fetch("http://localhost:4000/cart")
      .then(res => res.json())
      .then(data => {
        CartActions.setCart(data);
      })
      .catch(err => console.error("Cart rehydration failed", err));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;