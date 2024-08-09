import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
} from "./actions";

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case REGISTER_FAILURE:
      localStorage.removeItem('user')
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
