// reducer.js
import * as types from '../constans/CategoryConstans';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_REQUEST:
    case types.CREATE_CATEGORY_REQUEST:
    case types.UPDATE_CATEGORY_REQUEST:
    case types.DELETE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload, error: null };
    case types.CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: [...state.categories, action.payload], error: null };
    case types.UPDATE_CATEGORY_SUCCESS:
      const updatedCategories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
      return { ...state, loading: false, categories: updatedCategories, error: null };
    case types.DELETE_CATEGORY_SUCCESS:
      const filteredCategories = state.categories.filter((category) => category.id !== action.payload);
      return { ...state, loading: false, categories: filteredCategories, error: null };
    case types.FETCH_CATEGORIES_FAILURE:
    case types.CREATE_CATEGORY_FAILURE:
    case types.UPDATE_CATEGORY_FAILURE:
    case types.DELETE_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
