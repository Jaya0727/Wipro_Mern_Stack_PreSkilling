import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const increaseQty = async (item) => {
    await fetch(`http://localhost:3001/cart/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    });
    reloadCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "DELETE"
      });
    } else {
      await fetch(`http://localhost:3001/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      });
    }
    reloadCart();
  };

  const reloadCart = () => {
    fetch("http://localhost:3001/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center border p-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20" />
            <div>
              <h3>{item.title}</h3>
              <p>₹ {item.price}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => decreaseQty(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item)}>+</button>
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-6">Total: ₹ {total}</h2>
    </div>
  );
};

export default Cart;