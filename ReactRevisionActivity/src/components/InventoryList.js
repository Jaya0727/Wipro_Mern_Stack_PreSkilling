/* import React from "react";
import InventoryCard from "./InventoryCard";
function InventoryList() {
  const products = [
    { id: 1, name: "Shirt", price: 750, category: "Clothing" },
    { id: 2, name: "Headphones", price: 3000, category: "Electronics" },
    { id: 3, name: "Notebook", price: 150, category: "Stationery" },
    { id: 4, name: "Skirt", price: 1200, category: "Clothing" }
  ];
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Inventory Catalog</h2>
      <div className="row">
        {products.map(product => (
          <InventoryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default InventoryList;*/
import React, { useEffect, useState } from "react";
import InventoryCard from "./InventoryCard";
function InventoryList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h4>Loading products</h4>;
  if (error) return <h4>{error}</h4>;
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Inventory Catalog</h2>
      <div className="row">
        {products.map((product) => (
          <InventoryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default InventoryList;
