import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actions";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: null,
        authToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
