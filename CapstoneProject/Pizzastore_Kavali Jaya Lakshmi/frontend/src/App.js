import { Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import AdminBill from "./pages/AdminBill";
import OrderTracker from "./pages/OrderTracker";
import UserOrders from "./pages/UserOrders";
import UserBill from "./pages/UserBill"
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ItemDetails from "./pages/ItemDetails";
import AdminRevenue from "./pages/AdminRevenue";
import UpiPayment from "./pages/UpiPayment";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/menu" element={<AdminMenu/>}/>
        <Route path="/admin/orders" element ={<AdminOrders/>}/>
        <Route path="/admin/revenue" element ={<AdminRevenue/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/bill/:id" element ={<AdminBill/>}/>
        <Route path="/track/:id" element ={<OrderTracker/>}/>
        <Route path="/user/bill/:id" element ={<UserBill/>}/>
        <Route path ="/my-orders" element = {<UserOrders/>}/>
        <Route path="/contact" element = {<ContactUs/>}/>
        <Route path="/about" element = {<AboutUs/>}/>
        <Route path="/item/:id" element = {<ItemDetails/>}/>
        <Route path="/upi-payment" element = {<UpiPayment/>}/>
      </Routes>
      </div>
        <ToastContainer position="top-right" autoClose = {3000}/>
        <Footer/>

    </>
  );
}

export default App;
