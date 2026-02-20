import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaRupeeSign } from "react-icons/fa";

export default function ItemDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState(null);

  // To fetch each item
  useEffect(() => { const fetchItem = async () => {
        const res = await fetch("http://localhost:5000/api/menu");
        const data = await res.json();
        const found = data.find(
            (i) => i._id === id);
        setItem(found);
      };
    fetchItem();
  }, [id]);
  if (!item)
    return <h3>Loading...</h3>;

  const handleAddToCart = () => {
    addToCart(item);   // Add item
    navigate("/cart"); // Redirect
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="row">

          {/*Image*/}
          <div className="col-md-6">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
              style={{
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />
          </div>

          {/*Item Details*/}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">
              {item.name}
            </h2>

            <h3 className="text-danger">
              <FaRupeeSign/>{item.price}
            </h3>

            <p>
              Category: {item.category}
            </p>

            <p>
              Type: {item.type}
            </p>

            <button
              className="btn btn-danger mt-3"
              style={{
                width: "200px",
                fontSize: "18px",
              }}
              onClick={handleAddToCart}
            >
               + Add 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}