import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth } from "helpers/Firebase";
import { adminRoot } from "constants/defaultValues";
import { setCurrentUser } from "helpers/Utils";
import axios from "api/axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  API_CREATE_ACCOUNT,
  USER_TOKEN_KEY,
  REFRESH_USER_INFO,
  APP_WEB3_LOGIN_ID,
} from "../contants";

import { loginUserSuccess, loginUserError, registerUserError } from "./actions";
import useBlockchain from "blockchain/useBlockchain";

export function* watchWeb3SetLoginID() {
  yield takeEvery(APP_WEB3_LOGIN_ID, setWeb3CurrentID)
}

function* setWeb3CurrentID({payload}) {
  localStorage.setItem(USER_TOKEN_KEY, payload);
} 

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithID);
}

const loginWithIDAsync = async (id) => {
  const { premiumContract } = useBlockchain();
  return await premiumContract.getUser(id);
};

const getCurrentUserDetail = async (id) => {
  const { premiumContract } = useBlockchain();
  return await premiumContract.getUser(id);
};

function* loginWithID({ payload }) {
  const { id } = payload;
  try {
    const curUser = yield call(loginWithIDAsync, id);
    console.log(curUser)
    if (curUser) {
      localStorage.setItem(USER_TOKEN_KEY, id);
      setCurrentUser(curUser.user);
      
    } else {
      yield put(loginUserError('Invalid ID'));
    }
  } catch (error) {
    alert(error)
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
      history.push("/user/login");
      yield put(registerUserError("user.login-to-continue"));
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

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchRefreshUserInfo),
  ]);
}
