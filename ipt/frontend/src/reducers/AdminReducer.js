// reducer.js
import * as types from '../constans/AdminConstans';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Add cases for create, update, and delete actions
    default:
      return state;
  }
};


// userReducer.js

const initialStatee = {
  loading: false,
  users: [],
  error: null,
};

export const userReducer = (state = initialStatee, action) => {
  switch (action.type) {
    case types.GET_USERS_REQUEST:
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case types.GET_USERS_FAILURE:
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

 
