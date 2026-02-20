import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function AdminBill() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchBill = async () => {
      const token =localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setOrder(data);
    };
    fetchBill();
  }, [id]);

  if (!order)
    return <h3>Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4">
        <h2 className="text-center mb-4">
          Admin Invoice
        </h2>
        <hr />
        <p>
          <b>Order ID:</b>{" "}
          {order._id}
        </p>

        <p>
          <b>Status:</b>{" "}
          {order.status}
        </p>

        <hr />

        {/*Address*/}
        <h4>
          Delivery Address
        </h4>

        <p>
          {order.address?.fullName}
        </p>

        <p>
          {order.address?.phone}
        </p>

        <p>
          {order.address?.street}
        </p>

        <p>
          {order.address?.city}
        </p>

        <p>
          {order.address?.pincode}
        </p>

        <p>
          <b>Payment:</b>{" "}
          {order.paymentMethod}
        </p>
        <hr />

        {/*Items*/}
        {order.items.map(
          (item, i) => (
            <div
              key={i}
              className="d-flex justify-content-between border-bottom py-2">
              <span>
                {item.name} * {" "}
                {item.qty}
              </span>

              <span>
                <FaRupeeSign/>{item.price * item.qty}
              </span>
            </div>
          )
        )}
        <hr />
        <h3 className="text-end">
          Total: <FaRupeeSign/>{order.totalAmount}
        </h3>
      </div>
    </div>
  );
}