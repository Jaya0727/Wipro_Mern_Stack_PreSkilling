import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("orderStatusUpdated", (data) => {
      if (data.status === "Ready for Pickup") {
        toast.info("Your order is Ready for Pickup ");
      }
      else if (data.status === "Picked Up") {
        toast.success("Order Picked Up Successfully ");
      }
      else if (data.status === "Out for Delivery") {
        toast.info("Order is Out for Delivery ");
      }
      else if (data.status === "Delivered") {
        toast.success("Order Delivered ");
      }
      else {
        toast.info(`Order ${data.status}`);
      }

      fetchOrders();
    });

    return () => socket.disconnect();

  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:5000/api/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(
      `http://localhost:5000/api/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "Cancelled",
        }),
      }
    );

    toast.error("Order Cancelled ");
    fetchOrders();
  };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-4">
        My Orders
      </h2>

      {orders.map((o) => (
        <div
          key={o._id}
          className="card shadow mb-3 p-3">
          <div className="row">
            {/*Order Tab*/}
            <div className="col-md-4">
              <p>
                <b>Order ID:</b><br />
                {o._id}
              </p>

              <p>
                <b>Status:</b>
                <span className="ms-2 badge bg-warning">
                  {o.status}
                </span>
              </p>

              <p>
                <b>Total:</b> ₹{o.totalAmount}
              </p>

              <p>
                <b>Delivery Mode:</b> {o.deliveryMode}
              </p>

            </div>

            {/*Items*/}
            <div className="col-md-5">
              <h6 className="fw-bold">
                Ordered Items
              </h6>

              {o.items?.map((item, i) => (
                <div key={i} className="d-flex align-items-center mb-2 border-bottom pb-2">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/60"
                    }
                    alt={item.name}
                    width="60"
                    height="60"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "10px",
                    }}
                  />

                  <div>
                    <p className="mb-0 fw-semibold">
                      {item.name}
                    </p>

                    <small>
                      Qty: {item.qty} *
                      <FaRupeeSign />
                      {item.price}
                    </small>
                  </div>

                </div>
              ))}
            </div>

            <div className="col-md-3 d-flex flex-column justify-content-center gap-2">
              <Link
                to={`/user/bill/${o._id}`}
                className="btn btn-dark">
                Invoice
              </Link>

              <Link
                to={`/track/${o._id}`}
                className="btn btn-info text-white">
                Track Order
              </Link>

              {/*cancel order - user*/}
              {o.status === "Pending" && (
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    cancelOrder(o._id)}>
                  Cancel
                </button>
              )}

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}