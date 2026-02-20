import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
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
    fetchOrders();
  }, []);

  const updateStatus =
    async (id, status) => {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      window.location.reload();
    };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-4">
        Admin Orders
      </h2>

      {orders.map((o) => (

        <div
          key={o._id}
          className="card shadow mb-3 p-3"
        >

          {/* Order info */}
          <p>
            <b>Order ID:</b> {o._id}
          </p>

          <p>
            <b>User Email:</b>{" "}
            {o.userId?.email}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className="badge bg-secondary">
              {o.status}
            </span>
          </p>

          <p>
            <b>Delivery Mode:</b>{" "}
            {o.deliveryMode}
          </p>

          <p>
            <b>Payment:</b>{" "}
            {o.paymentMethod}
          </p>

          <p>
            <b>Total:</b> ₹{o.totalAmount}
          </p>

          <hr />

          {/* Delivery address*/}
          {o.deliveryMode ===
            "Home Delivery" && (
            <>
              <h6>
                Delivery Address
              </h6>

              <p className="mb-1">
                {o.address?.fullName}
              </p>

              <p className="mb-1">
                {o.address?.phone}
              </p>

              <p>
                {o.address?.street ||
                  o.address?.addressLine}
                <br />
                {o.address?.city} -{" "}
                {o.address?.pincode}
              </p>

              <hr />
            </>
          )}

          {/*Order Items*/}
          <h6>
            Ordered Items
          </h6>

          {o.items?.map((item, i) => (
            <div
              key={i}
              className="d-flex align-items-center mb-2 border-bottom pb-2"
            >

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
                  Qty: {item.qty}* <FaRupeeSign/>
                  {item.price}
                </small>
              </div>

            </div>
          ))}

          <hr />

          {/* bill*/}
          <Link
            to={`/admin/bill/${o._id}`}
            className="btn btn-dark mb-3"
          >
            Generate Bill
          </Link>

          {/* status */}
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-success"
              onClick={() =>
                updateStatus(
                  o._id,
                  "Accepted"
                )
              }
            >
              Accept
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                updateStatus(
                  o._id,
                  "Rejected"
                )
              }
            >
              Reject
            </button>

            <button
              className="btn btn-warning"
              onClick={() =>
                updateStatus(
                  o._id,
                  "Preparing"
                )
              }
            >
              Preparing
            </button>

            {/*Home Delivery flow*/}
            {o.deliveryMode ===
              "Home Delivery" && (
              <>
                <button
                  className="btn btn-info"
                  onClick={() =>
                    updateStatus(
                      o._id,
                      "Out for Delivery"
                    )
                  }
                >
                  Out for Delivery
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() =>
                    updateStatus(
                      o._id,
                      "Delivered"
                    )
                  }
                >
                  Delivered
                </button>
              </>
            )}

            {/* Pickup flow */}
            {o.deliveryMode ===
              "Store Pickup" && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    updateStatus(
                      o._id,
                      "Ready for Pickup"
                    )
                  }
                >
                  Ready for Pickup
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() =>
                    updateStatus(
                      o._id,
                      "Picked Up"
                    )
                  }
                >
                  Picked Up
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}