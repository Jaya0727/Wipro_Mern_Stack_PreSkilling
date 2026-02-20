import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  //Get user by token
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(
        `cart_${user?._id}`
      );
    return storedCart
      ? JSON.parse(storedCart)
      : [];
  });

  //To sace cart
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(
        `cart_${user._id}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, user]);

  //Add to cart
  const addToCart = (item) => {
    const exist =
      cart.find(
        (i) =>
          i._id === item._id
      );

    if (exist) {
      setCart(
        cart.map((i) =>
          i._id === item._id
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        )
      );

    } else {
      setCart([
        ...cart,
        {
          ...item,
          qty: 1,
        },
      ]);
    }
  };

  //Increase quantity - cart
  const increaseQty = (id) => {
    setCart(
      cart.map((i) =>
        i._id === id
          ? {
              ...i,
              qty: i.qty + 1,
            }
          : i
      )
    );
  };

  //Decrease quantity - cart
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((i) =>
          i._id === id
            ? {
                ...i,
                qty: i.qty - 1,
              }
            : i
        )
        .filter(
          (i) => i.qty > 0
        )
    );
  };

  //Remove item
  const removeItem = (id) => {
    setCart(
      cart.filter(
        (i) => i._id !== id
      )
    );
  };

  //To clear cart once order placed
  const clearCart = () => {
    setCart([]);
    if (user?._id) {
      localStorage.removeItem(
        `cart_${user._id}`
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};