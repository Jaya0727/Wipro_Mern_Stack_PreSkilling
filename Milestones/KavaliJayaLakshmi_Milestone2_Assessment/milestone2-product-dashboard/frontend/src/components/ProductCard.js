import { Link } from "react-router-dom";

function ProductCard({product}) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5>{product.name}</h5>
          <p className="text-muted">{product.category}</p>
          <p className="fw-bold">${product.price}</p>
        </div>
        <div className="card-footer bg-white border-0">
          <Link to={`/product/${product.id}`}
            className="btn btn-dark w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
