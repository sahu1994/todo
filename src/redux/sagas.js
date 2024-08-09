import { takeLatest, call, put } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_TASKS_REQUEST,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  fetchTasksSuccess,
  fetchTasksFailure,
  LOGOUT_SUCCESS,
  logout,
} from "./actions";

import axios from "../services/axios";

function* fetchTasksSaga(action) {
  try {
    const response = yield call(axios.get, `/tasks/${action.payload}`);
    yield put(fetchTasksSuccess(response.data.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* handleLogin(action) {
  try {
    const response = yield call(axios.post, "/login", action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.response?.message || "API Error"));
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(axios.post, "/signUp", action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response?.message || "API Error"));
  }
}

function* addTaskSaga(action) {
  try {
    yield call(axios.post, "/tasks", action.payload);
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* updateTaskSaga(action) {
  try {
    const userId = action.payload.userId
    yield call(axios.put, `/tasks/${userId}`, {
      userId,
      title: action.payload.title,
      description: action.payload.description,
    });
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(axios.delete, `/tasks/${action.payload}`, { method: "delete" });
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* logoutUser(action) {
  try {
    yield put(logout);
  } catch (error) {
    return;
  }
}

export default function* authSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(UPDATE_TASK, updateTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
  yield takeLatest(LOGOUT_SUCCESS, logoutUser);
}
