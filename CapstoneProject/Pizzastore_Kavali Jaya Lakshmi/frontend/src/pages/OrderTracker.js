import {useEffect,useState,} from "react";
import {useParams} from "react-router-dom";

export default function OrderTracker() {
  const { id } = useParams();
  const [order,setOrder] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/orders/${id}`,{
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
        const data = await res.json();
        setOrder(data);
      };
    fetchOrder();
  }, [id]);
  if (!order)
    return <h3>Loading...</h3>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Order Tracking
      </h2>
      {order.timeline.map(
        (step, i) => (
          <div
            key={i}
            className="card p-3 mb-3 shadow-sm">
            <h5>
              {step.text}
            </h5>
            <small>
              {step.time}
            </small>
          </div>
        )
      )}
    </div>
  );
}