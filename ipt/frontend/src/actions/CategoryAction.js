// actions.js
import axios from 'axios';
import * as types from '../constans/CategoryConstans';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: types.FETCH_CATEGORIES_REQUEST });

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categorys/');
    dispatch({ type: types.FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
  dispatch({ type: types.CREATE_CATEGORY_REQUEST });

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

    const response = await axios.post('http://127.0.0.1:8000/api/categorys/create/', categoryData, config);
    dispatch({ type: types.CREATE_CATEGORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_CATEGORY_FAILURE, payload: error.message });
  }
};

export const updateCategory = (categoryId, categoryData) => async (dispatch, getState) => {
  dispatch({ type: types.UPDATE_CATEGORY_REQUEST });

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

    const response = await axios.put(`http://127.0.0.1:8000/api/categorys/update/${categoryId}/`, categoryData, config);
    dispatch({ type: types.UPDATE_CATEGORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_CATEGORY_FAILURE, payload: error.message });
  }
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({ type: types.DELETE_CATEGORY_REQUEST });

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


    await axios.delete(`http://127.0.0.1:8000/api/categorys/delete/${categoryId}/`, config);
    dispatch({ type: types.DELETE_CATEGORY_SUCCESS, payload: categoryId });
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILURE, payload: error.message });
  }
};
