import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Productlist from "./Pages/Productlist";
import Productdetails from "./Pages/Productdetails";
import CustomerService from "./Pages/CustomerService";
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Productlist />} />

        <Route
          path="/products/:id"
          element={<Productdetails />}
        />

        <Route
          path="/customer-service"
          element={<CustomerService />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;