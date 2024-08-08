import { combineReducers } from 'redux';
import authReducer from './reducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  auth: authReducer, 
  tasks: taskReducer,
});

export default rootReducer;
