// actions.js
import axios from 'axios';
import * as types from '../constans/AdminConstans';

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const{
        userLogin: {userInfo}, 
      }= getState()
  
      const config = {
        headers:{
          'Content-type': 'application/json',
          Authorization : `Bearer ${userInfo.token}`
        }
      }

    dispatch({ type: types.FETCH_ORDERS_REQUEST });
    const response = await axios.get('http://127.0.0.1:8000/api/orders/orders/',config);
    dispatch({ type: types.FETCH_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_ORDERS_FAILURE, payload: error.message });
  }
};

// userActions.js
export const getUsers = () => async (dispatch, getState) => {
  try {
    const{
      userLogin: {userInfo}, 
    }= getState()

    const config = {
      headers:{
        'Content-type': 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }

    dispatch({ type: types.GET_USERS_REQUEST });

    const { data } = await axios.get('http://127.0.0.1:8000/api/users/users/',config); // Replace with your API endpoint for fetching users

    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAILURE,
      payload: error.response?.data || 'Something went wrong',
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const{
      userLogin: {userInfo}, 
    }= getState()

    const config = {
      headers:{
        'Content-type': 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }

    dispatch({ type: types.DELETE_USER_REQUEST });

    await axios.delete(`http://127.0.0.1:8000/api/users/user/delete/${userId}/`, config); // Replace with your API endpoint for deleting users

    dispatch({
      type: types.DELETE_USER_SUCCESS,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAILURE,
      payload: error.response?.data || 'Something went wrong',
    });
  }
};



