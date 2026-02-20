import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  state = { products:[], loading: true };

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      this.setState({ products: data, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }
  render() {
    if (this.state.loading)
      return <p className="text-center mt-4">Loading..</p>;

    return (
      <div className="container mt-4">
        <h3 className="text-center mb-4">Product List</h3>
        <div className="row">
          {this.state.products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
