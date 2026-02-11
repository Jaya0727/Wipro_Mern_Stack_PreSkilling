import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import InventoryCard from "../components/InventoryCard";
import { Link } from "react-router-dom";
function ProductList() {
  const { products } = useContext(ProductContext);
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Product List</h2>
        <Link to="/add" className="btn btn-dark px-4 py-2 rounded">
          Add Item
        </Link>
      </div>
      <div className="row">
        {products.map(product => (
          <InventoryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default ProductList;
