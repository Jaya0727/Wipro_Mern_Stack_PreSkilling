import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // 🔹 Fetch single product from backend
  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // 🔹 ADD TO CART (BACKEND)
  const addToCart = async (product) => {
    const res = await fetch("http://localhost:3001/cart");
    const cart = await res.json();

    const existing = cart.find(item => item.productId === product.id);

    if (existing) {
      await fetch(`http://localhost:3001/cart/${existing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existing.quantity + 1 })
      });
    } else {
      await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      });
    }
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="p-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-72 h-96 object-contain mx-auto"
      />

      <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
      <p className="text-xl text-red-600 mt-2">₹ {product.price}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={async () => {
            await addToCart(product);
            navigate("/cart");
          }}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Productdetails;