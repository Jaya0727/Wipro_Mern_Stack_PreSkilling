import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PageTransition from "../transitions/PageTransition";
import { AuthContext } from "../context/AuthContext";
import { CartActions } from "../flux/actions/CartActions";

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    };

    // backend
    await fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cartItem, quantity: 1 })
    });

    // flux
    CartActions.addToCart(cartItem);

    navigate("/cart");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <PageTransition>
      <div className="p-10">
        <img src={product.image} className="w-72 mx-auto" />
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-red-600 text-xl">₹ {product.price}</p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 mt-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </PageTransition>
  );
};

export default Productdetails;