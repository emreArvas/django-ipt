import * as actionTypes from '../constans/CartConstants';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const newItem = {
        product: action.payload.product,
        quantity: action.payload.quantity,
      };
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };

    case actionTypes.REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
      return {
        ...state,
        cartItems: filteredCartItems,
      };

    case actionTypes.UPDATE_QUANTITY:
      const updatedCartItems = state.cartItems.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
