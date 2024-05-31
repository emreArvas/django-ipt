import * as actionTypes from '../constans/CartConstants';

export const addToCart = (product, quantity) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: { product, quantity },
  };
};

export const removeFromCart = (productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateQuantity = (productId, quantity) => {
  return {
    type: actionTypes.UPDATE_QUANTITY,
    payload: { productId, quantity },
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};
