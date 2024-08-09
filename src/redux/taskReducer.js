import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './actions';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, loading: false, error: null };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload]};
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.userId === action.payload.userId ? action.payload : task),
      };
    case DELETE_TASK:
      console.log(action)
      return { ...state, tasks: state.tasks.filter(task => task._id !== action.payload) };
    default:
      return state;
  }
};

export default taskReducer;
