import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,0
  );
  const [showCheckout, setShowCheckout] = useState(false);

  //Validation
  const validationSchema = Yup.object({
      fullName:
        Yup.string()
          .required("Full Name required"),
      phone:
        Yup.string()
          .matches(
            /^[0-9]{10}$/,
            "Phone must be 10 digits"
          )
          .required("Phone required"),

      addressLine:
        Yup.string().when(
          "deliveryMode",
          {
            is: "Home Delivery",
            then: (s) =>
              s.required("Address required"),
          }
        ),

      city:
        Yup.string().when(
          "deliveryMode",
          {
            is: "Home Delivery",
            then: (s) =>
              s.required("City required"),
          }
        ),

      pincode:
        Yup.string().when(
          "deliveryMode",
          {
            is: "Home Delivery",
            then: (s) =>
              s.required(
                "Pincode required"
              ),
          }
        ),

      paymentMethod:
        Yup.string()
          .required(
            "Select payment method"
          ),
    });

  //Formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      pincode: "",
      paymentMethod: "COD",
      deliveryMode: "Home Delivery",
    },

    validationSchema,
    onSubmit: async (values) => {
      const token =
        localStorage.getItem("token");
      if (!token) {
        alert("Login first");
        return;
      }
    //upi flow
      if (values.paymentMethod === "UPI") {
        navigate("/upi-payment", {
          state: {
            items: cart,
            totalAmount: total,
            address: values,
            paymentMethod:
              values.paymentMethod,
            deliveryMode:
              values.deliveryMode,
          },
        });
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            totalAmount: total,
            address: values,
            paymentMethod:
              values.paymentMethod,
            deliveryMode:
              values.deliveryMode,
          }),
        }
      );

      if (res.ok) {
        toast.success(
          values.deliveryMode ===
            "Store Pickup"
            ? "Pickup Order Placed"
            : "Order Placed Successfully",
          {
            position: "top-right",
            autoClose: 1200,
          }
        );

        clearCart();
        setShowCheckout(false);
      } else {
        alert("Order Failed");
      }
    },
  });

  //Empty cart
  if (cart.length === 0)
    return (
      <h3 className="text-center mt-5">
        Cart Empty
      </h3>
    );

  return (
    <div className="container mt-4">

      <h2>Your Cart</h2>

      {/* cart items */}
      {cart.map((item) => (
        <div
          key={item._id}
          className="card p-3 mb-3"
        >
      
          <div className="d-flex justify-content-between">
            <div>
              <h5>{item.name}</h5>
              <FaRupeeSign/>{item.price}
            </div>

            <div>
              <button
                onClick={() =>
                  decreaseQty(item._id)
                }>-</button>
              {item.qty}
              <button
                onClick={() =>
                  increaseQty(item._id)
                }
              >+</button>
            </div>

          </div>
        </div>
      ))}

      <h4>Total <FaRupeeSign/>{total}</h4>
      <p className="text-danger fw-semibold mt-2">Note:Once order enters Preparing stage,it cannot be cancelled.</p>
      <button
        className="btn btn-success"
        onClick={() =>
          setShowCheckout(true)
        }
      >
        Proceed
      </button>

      {/* Checkout*/}
      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-box">
            <h4>Delivery Details</h4>

            <form onSubmit={formik.handleSubmit}>

              {/*Delivery Mode*/}
              <label>Delivery Mode</label>
              <select
                name="deliveryMode"
                className="form-control mb-2"
                value={
                  formik.values
                    .deliveryMode
                }
                onChange={
                  formik.handleChange
                }
              >
                <option>
                  Home Delivery
                </option>
                <option>
                  Store Pickup
                </option>
              </select>

              {/*Name*/}
              <input
                name="fullName"
                placeholder="Full Name"
                className="form-control mb-1"
                value={
                  formik.values.fullName
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
              />

              {formik.touched
                .fullName &&
                formik.errors
                  .fullName && (
                  <small className="text-danger">
                    {
                      formik.errors
                        .fullName
                    }
                  </small>
                )}

              {/*Phone*/}
              <input
                name="phone"
                placeholder="Phone"
                className="form-control mb-1"
                value={
                  formik.values.phone
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
              />

              {formik.touched.phone &&
                formik.errors.phone && (
                  <small className="text-danger">
                    {
                      formik.errors
                        .phone
                    }
                  </small>
                )}

              {/*Address*/}
              <input
                name="addressLine"
                placeholder="Address"
                className="form-control mb-1"
                disabled={
                  formik.values
                    .deliveryMode ===
                  "Store Pickup"
                }
                value={
                  formik.values
                    .addressLine
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
              />
              {formik.touched
                .addressLine &&
                formik.errors
                  .addressLine && (
                  <small className="text-danger">
                    {
                      formik.errors
                        .addressLine
                    }
                  </small>
                )}

              {/*City*/}
              <input
                name="city"
                placeholder="City"
                className="form-control mb-1"
                disabled={
                  formik.values
                    .deliveryMode ==="Store Pickup"
                }
                value={
                  formik.values.city
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
              />

              {formik.touched.city &&
                formik.errors.city && (
                  <small className="text-danger">
                    {
                      formik.errors
                        .city
                    }
                  </small>
                )}

              {/* Pincode*/}
              <input
                name="pincode"
                placeholder="Pincode"
                className="form-control mb-1"
                disabled={
                  formik.values
                    .deliveryMode === "Store Pickup"
                }
                value={
                  formik.values
                    .pincode
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
              />

              {formik.touched
                .pincode &&
                formik.errors
                  .pincode && (
                  <small className="text-danger">
                    {
                      formik.errors
                        .pincode
                    }
                  </small>
                )}

              {/*Payment*/}
              <select
                name="paymentMethod"
                className="form-control mb-3"
                value={
                  formik.values
                    .paymentMethod
                }
                onChange={
                  formik.handleChange
                }
              >
                <option value="COD">
                  COD
                </option>
                <option value="UPI">
                  UPI
                </option>
              </select>

              <button
                type="submit"
                className="btn btn-primary w-100">
                Confirm Order
              </button>

            </form>

            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}