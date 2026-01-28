import AppDispatcher from "../dispatcher/AppDispatcher";
import * as ActionTypes from "../constants/ActionTypes";

let cart = [];
const listeners = [];

AppDispatcher.register((action) => {
  switch (action.type) {

    case ActionTypes.ADD_TO_CART: {
      const existing = cart.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...action.payload, quantity: 1 });
      }

      listeners.forEach(cb => cb());
      break;
    }

    case ActionTypes.DECREASE_QTY: {
      const item = cart.find(i => i.id === action.payload);

      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== action.payload);
        }
      }

      listeners.forEach(cb => cb());
      break;
    }

    case ActionTypes.REMOVE_FROM_CART:
      cart = cart.filter(item => item.id !== action.payload);
      listeners.forEach(cb => cb());
      break;

    default:
      break;
  }
});

const CartStore = {
  getCart() {
    return cart;
  },
  addChangeListener(cb) {
    listeners.push(cb);
  },
  removeChangeListener(cb) {
    const index = listeners.indexOf(cb);
    if (index > -1) listeners.splice(index, 1);
  }
};

export default CartStore;