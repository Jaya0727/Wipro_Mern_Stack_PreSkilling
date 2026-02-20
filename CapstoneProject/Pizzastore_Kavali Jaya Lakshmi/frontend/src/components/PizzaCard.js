import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {FaRupeeSign} from "react-icons/fa";

export default function PizzaCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!item) return null;
  const imageSrc = item.image || "https://via.placeholder.com/300";
  return (
    <div
      className="card pizza-card h-100 shadow border-0 rounded-4"
      style={{ cursor: "pointer" }}
      onClick={() =>
        navigate(`/item/${item._id}`)
      }
    >

      {/*Image*/}
      <img
        src={imageSrc}
        className="card-img-top menu-img rounded-top-4"
        alt={item.name}
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div className="card-body text-center d-flex flex-column">
        <h5 className="fw-bold">
          {item.name}
        </h5>
      {/*veg and non-veg dot*/}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
          <span className={`food-dot ${
               item.type === "veg"
               ? "veg-dot"
              : "nonveg-dot"
              }`}
          ></span>
        <small className="fw-semibold text-muted">
            {item.type?.toUpperCase()}
             </small>
             </div>

        <h6 className="fw-bold text-dark mt-2">
          <FaRupeeSign/>{item.price}
        </h6>

        {/*Add to cart button */}
        <button
          className="btn btn-danger w-100 mt-3 rounded-pill"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);

            // Redirect to Cart
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}