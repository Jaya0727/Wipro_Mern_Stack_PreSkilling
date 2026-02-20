import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);
  if (!product) return <p className="text-center mt-4">Loading...</p>;
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3>{product.name}</h3>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h5>{product.price}</h5>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
