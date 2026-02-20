import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function UpiPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const {clearCart} = useContext(CartContext);
  // Data from Cart
  const orderData = location.state;
  useEffect(() => {
    if (!orderData) {
      toast.error("No payment data found");
      navigate("/cart");
    }
  }, [orderData, navigate]);

  const payNow = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (res.ok) {
        toast.success("Payment Successful");
        clearCart();
        navigate("/my-orders");
      } else {
        toast.error("Payment Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="upi-page">
      <div className="upi-card">
        <h3 className="upi-title">
          Complete Your Payment
        </h3>
        <p className="upi-subtitle">
          Scan QR using any UPI App
        </p>
        {/*QR Image*/}
        <div className="qr-box">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=pizzeriaa@upi"
            alt="QR"/>
        </div>

        {/*Upi Id*/}
        <p className="upi-id">
          UPI ID: <b>pizzeriaa@upi</b>
        </p>

        {/*Amount*/}
        <h4 className="upi-amount">
          Amount: <FaRupeeSign/>{orderData?.totalAmount}
        </h4>

        {/*Pay Button*/}
        <button
          className="btn btn-success upi-pay-btn"
          onClick={payNow}>
          I Have Paid
        </button>
      </div>
    </div>
  );
}