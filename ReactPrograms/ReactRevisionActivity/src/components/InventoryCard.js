import React, { useState } from "react";
import { Link } from "react-router-dom";

function InventoryCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>

          <p className="card-text">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="card-text">
            <strong>Price:</strong> ₹{product.price}
          </p>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-info btn-sm me-2"
          >
            View Details
          </Link>

          <button
            className={`btn btn-sm ${
              isFavorite ? "btn-dark" : "btn-outline-primary"
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default InventoryCard;
