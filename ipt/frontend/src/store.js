import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'


import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCategoryReducer,
} from './reducers/ProducReducers';
import { userLoginReducer, userDetailsReducer,userRegisterReducer, userUpdateProfileReducer} from './reducers/UserReducers';
import cartReducer from './reducers/CartReducers';
import categoryReducer from './reducers/CategoryReducer';
import { orderReducer, userReducer } from './reducers/AdminReducer';

// Combine all reducers
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCategory: productCategoryReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile :  userUpdateProfileReducer,
  cart: cartReducer,
  category: categoryReducer,
  order: orderReducer,
  user: userReducer,




});

// Create the Redux store
const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo"))
  :null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState={
  userLogin:{userInfo:userInfoFromStorage},
  cart:{
    cartItems:cartItemsFromStorage,


},

}


const store = createStore(rootReducer,initialState,  composeWithDevTools(applyMiddleware(...middleware)))


export default store
