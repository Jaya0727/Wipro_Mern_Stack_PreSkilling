import AppDispatcher from "../dispatcher/AppDispatcher";
import * as ActionTypes from "../constants/ActionTypes";

export const CartActions = {
  addToCart(product) {
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: product
    });
  },
  setCart(cart){
    AppDispatcher.dispatch({
      type:ActionTypes.SET_CART,
      payload:cart
    });
  },

  decreaseQty(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.DECREASE_QTY,
      payload: id
    });
  },

  removeFromCart(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOVE_FROM_CART,
      payload: id
    });
  }
};