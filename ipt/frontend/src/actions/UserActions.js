import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL 
} from '../constans/UserConstants';

// User login action
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://127.0.0.1:8000/api/users/login/', { username, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // You can save the user data in local storage or session storage here if needed.
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// User registration action
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://127.0.0.1:8000/api/users/register/', { username, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // You can automatically log in the user after registration if needed.
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// User details action
export const getUserProfile = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const{
      userLogin: {userInfo}, 
    }= getState()

    const config = {
      headers:{
        'Content-type': 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`http://127.0.0.1:8000/api/users/profile/${username}/`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// User logout action
export const logout = () => (dispatch) => {
  // You can add any additional code required for logout here, like clearing local storage, etc.
  dispatch({ type: USER_LOGIN_LOGOUT });
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    const{
      userLogin: {userInfo}, 
    }= getState()

    const config = {
      headers:{
        'Content-type': 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`http://127.0.0.1:8000/api/users/update/profile/${userInfo.id}/`, user, config);

    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};