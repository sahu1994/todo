import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from './actions';
import axios from '../services/axios';

function* handleLogin(action) {
  try {
    const response = yield call(axios.post, '/user/login', action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.response?.message || "API Error"));
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(axios.post, '/user/signUp', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response?.message || "API Error"));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
