import axios from 'api/axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  API_ACTIVE_SUBSCRIPTION,
  API_LIST_PACKAGES,
  API_MY_DAILY_EARNINGS,
  API_MY_REFERRAL_COUNT,
  API_UPDATE_PROFILE,
  APP_GET_ACTIVE_SUBSCRIPTION,
  APP_GET_PACKAGES,
  APP_GET_RECENT_EARNINGS,
  APP_MY_REFERRAL_COUNT,
  APP_UPDATE_PROFILE,
} from 'redux/contants';
import {
  getActiveSubscriptionError,
  getActiveSubscriptionSuccess,
  getMyReferralCountError,
  getMyReferralCountSuccess,
  getPackagesError,
  getPackagesSuccess,
  getRecentEarningsError,
  getRecentEarningsSuccess,
  setNoActiveSubscription,
  updateProfileError,
  updateProfileSuccess,
} from './actions';

export function* watchGetPackages() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(APP_GET_PACKAGES, getPackages);
}

const fetchPackagesAsync = async () => {
  const packagesResp = await axios.get(API_LIST_PACKAGES);
  if (packagesResp.data.error) {
    return { error: packagesResp.data.error };
  }
  return { record: packagesResp.data.data };
};

function* getPackages() {
  try {
    const packagesResp = yield call(fetchPackagesAsync);
    if (packagesResp.error) {
      yield put(getPackagesError(packagesResp.error));
    } else {
      yield put(getPackagesSuccess(packagesResp.record));
    }
  } catch (err) {
    yield put(getPackagesError(err));
  }
}

export function* watchActiveSubscription() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(APP_GET_ACTIVE_SUBSCRIPTION, getActiveSubscription);
}

const fetchActiveSubscriptionAsync = async () => {
  const resp = await axios.get(API_ACTIVE_SUBSCRIPTION);
  if (resp.data.error) {
    return { error: resp.data.error };
  }
  return { record: resp.data.data };
};

function* getActiveSubscription() {
  try {
    const resp = yield call(fetchActiveSubscriptionAsync);
    if (resp.error) {
      yield put(getActiveSubscriptionError(resp.error));
      yield put(setNoActiveSubscription(true));
    } else {
      yield put(getActiveSubscriptionSuccess(resp.record));
      yield put(setNoActiveSubscription(false));
    }
  } catch (err) {
    yield put(getActiveSubscriptionError(err));
    yield put(setNoActiveSubscription(true));
  }
}

/** APP_MY_REFERRAL_COUNT */
const fetchMyReferralCountAsync = async () => {
  const resp = await axios.get(API_MY_REFERRAL_COUNT);
  if (resp.data.error) {
    return { error: resp.data.error };
  }
  return { record: resp.data.data };
};

function* getMyReferralCount() {
  try {
    const resp = yield call(fetchMyReferralCountAsync);
    if (resp.error) {
      yield put(getMyReferralCountError(resp.error));
    } else {
      yield put(getMyReferralCountSuccess(resp.record));
    }
  } catch (err) {
    yield put(getMyReferralCountError(err));
  }
}

export function* watchGetMyReferralCount() {
  yield takeEvery(APP_MY_REFERRAL_COUNT, getMyReferralCount);
}

/** APP_GET_RECENT_EARNINGS */
const fetchMyRecentEarningsAsync = async () => {
  const resp = await axios.get(`${API_MY_DAILY_EARNINGS}?limit=3`);
  if (resp.data.error) {
    return { error: resp.data.error };
  }
  return { record: resp.data.data };
};

function* getMyRecentEarnings() {
  try {
    const resp = yield call(fetchMyRecentEarningsAsync);
    if (resp.error) {
      yield put(getRecentEarningsError(resp.error));
    } else {
      yield put(getRecentEarningsSuccess(resp.record));
    }
  } catch (err) {
    yield put(getRecentEarningsError(err));
  }
}

export function* watchGetGetMyRecentEarnings() {
  yield takeEvery(APP_GET_RECENT_EARNINGS, getMyRecentEarnings);
}

/** APP_GET_RECENT_EARNINGS */
const updateProflieAsync = async (profile) => {
  const resp = await axios.post(API_UPDATE_PROFILE, profile);
  if (resp.data.error) {
    return { error: resp.data.error };
  }
  return { record: resp.data.data };
};

function* callUpdateProfile({ payload }) {
  const { profile } = payload;
  try {
    const resp = yield call(updateProflieAsync, profile);
    if (resp.error) {
      yield put(updateProfileError(resp.error));
    } else {
      yield put(updateProfileSuccess());
    }
  } catch (err) {
    yield put(updateProfileError(err));
  }
}

export function* watchUpdateProfile() {
  yield takeEvery(APP_UPDATE_PROFILE, callUpdateProfile);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetPackages),
    fork(watchActiveSubscription),
    fork(watchGetMyReferralCount),
    fork(watchGetGetMyRecentEarnings),
    fork(watchUpdateProfile),
  ]);
}
