import { useEffect, useState } from "react";
import cartStore from "../flux/stores/CartStore";
import { CartActions } from "../flux/actions/CartActions";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Sync cart with Flux store
  useEffect(() => {
    const updateCart = () => {
      setCart(cartStore.getCart());
    };

    updateCart();
    cartStore.addChangeListener(updateCart);

    return () => {
      cartStore.removeChangeListener(updateCart);
    };
  }, []);

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <p className="text-gray-600">Your cart is empty</p>
      )}

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm: flex-row justify-between items-start sm:items-center border p-4 mb-4 rounded"
        >
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
            />

            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">₹ {item.price}</p>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-2 sm:gap-3 mt-2">
                <button
                  onClick={() => CartActions.decreaseQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => CartActions.addToCart(item)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <p className="font-semibold">
              ₹ {item.price * item.quantity}
            </p>

            <button
              onClick={() => CartActions.removeFromCart(item.id)}
              className="text-red-600 mt-2 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="text-right mt-6">
          <h3 className="text-xl font-bold">
            Total: ₹ {total}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;