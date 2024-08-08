import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from './actions';
  
  const initialState = {
    user: "",
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  