import { combineReducers } from 'redux';
import authReducer from './reducer';

const rootReducer = combineReducers({
  auth: authReducer, 
});

export default rootReducer;
