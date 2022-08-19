import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import axios from 'api/axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  API_CURRENT_ACCOUNT,
  API_LOGIN,
  API_CREATE_ACCOUNT,
  USER_TOKEN_KEY,
  REFRESH_USER_INFO,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  const response = await axios.post(
    API_LOGIN,
    JSON.stringify({ username: email, password })
  );
  if (response.data.error) {
    return { message: response.data.error };
  }
  return { token: response.data.data };
};

const getCurrentUserDetail = async (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const curUserResp = await axios.get(API_CURRENT_ACCOUNT, {
    headers,
  });
  if (curUserResp.data.error) {
    return { message: curUserResp.data.error };
  }
  return { user: curUserResp.data.data };
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem(USER_TOKEN_KEY, loginUser.token);

      const curUser = yield call(getCurrentUserDetail, loginUser.token);
      if (curUser.message) {
        yield put(loginUserError(curUser.message));
      } else {
        setCurrentUser(curUser.user);
        yield put(loginUserSuccess(curUser.user));
        history.push(adminRoot);
        window.location.reload();
      }
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRefreshUserInfo() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REFRESH_USER_INFO, refereshUserInfo);
}

function* refereshUserInfo() {
  const curUser = yield call(getCurrentUserDetail);
  console.log(curUser);
  if (curUser.message) {
    yield put(loginUserError(curUser.message));
  } else {
    setCurrentUser(curUser.user);
    yield put(loginUserSuccess(curUser.user));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (
  referralId,
  username,
  password,
  email,
  phoneNumber,
  firstName,
  lastName
) => {
  const response = await axios.post(
    API_CREATE_ACCOUNT,
    JSON.stringify({
      referral_id: referralId,
      username,
      email,
      password,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
    })
  );
  if (response.data.error) {
    return { message: response.data.error };
  }
  return true;
};

function* registerWithEmailPassword({ payload }) {
  const {
    referralId,
    username,
    password,
    email,
    phoneNumber,
    firstName,
    lastName,
  } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      referralId,
      username,
      password,
      email,
      phoneNumber,
      firstName,
      lastName
    );
    if (!registerUser.message) {
      history.push('/user/login');
      yield put(registerUserError('user.login-to-continue'));
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  yield call(logoutAsync, history);
  localStorage.removeItem(USER_TOKEN_KEY);
  setCurrentUser();
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchRefreshUserInfo),
  ]);
}
