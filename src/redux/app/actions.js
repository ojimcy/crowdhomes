import {
  APP_GET_ACTIVE_SUBSCRIPTION,
  APP_GET_ACTIVE_SUBSCRIPTION_ERROR,
  APP_GET_ACTIVE_SUBSCRIPTION_SUCCESS,
  APP_GET_PACKAGES,
  APP_GET_PACKAGES_SUCCESS,
  APP_GET_PACKAGES_ERROR,
  APP_SET_NO_ACTIVE_SUBSCRIPTION,
  APP_MY_REFERRAL_COUNT,
  APP_MY_REFERRAL_COUNT_SUCCESS,
  APP_MY_REFERRAL_COUNT_ERROR,
  APP_GET_RECENT_EARNINGS,
  APP_GET_RECENT_EARNINGS_SUCCESS,
  APP_GET_RECENT_EARNINGS_ERROR,
  APP_UPDATE_PROFILE,
  APP_UPDATE_PROFILE_SUCCESS,
  APP_UPDATE_PROFILE_ERROR,
} from 'redux/contants';

export const getPackages = () => ({
  type: APP_GET_PACKAGES,
  payload: {},
});
export const getPackagesSuccess = (packages) => ({
  type: APP_GET_PACKAGES_SUCCESS,
  payload: packages,
});
export const getPackagesError = (message) => ({
  type: APP_GET_PACKAGES_ERROR,
  payload: { message },
});

export const getActiveSubscription = () => ({
  type: APP_GET_ACTIVE_SUBSCRIPTION,
  payload: {},
});
export const getActiveSubscriptionSuccess = (packages) => ({
  type: APP_GET_ACTIVE_SUBSCRIPTION_SUCCESS,
  payload: packages,
});
export const getActiveSubscriptionError = (message) => ({
  type: APP_GET_ACTIVE_SUBSCRIPTION_ERROR,
  payload: { message },
});
export const setNoActiveSubscription = (status) => ({
  type: APP_SET_NO_ACTIVE_SUBSCRIPTION,
  payload: status,
});

export const getMyReferralCount = () => ({
  type: APP_MY_REFERRAL_COUNT,
});
export const getMyReferralCountSuccess = (count) => ({
  type: APP_MY_REFERRAL_COUNT_SUCCESS,
  payload: count,
});
export const getMyReferralCountError = (message) => ({
  type: APP_MY_REFERRAL_COUNT_ERROR,
  payload: { message },
});

export const getRecentEarnings = () => ({
  type: APP_GET_RECENT_EARNINGS,
});
export const getRecentEarningsSuccess = (earnings) => ({
  type: APP_GET_RECENT_EARNINGS_SUCCESS,
  payload: earnings,
});
export const getRecentEarningsError = (message) => ({
  type: APP_GET_RECENT_EARNINGS_ERROR,
  payload: { message },
});

export const updateProfile = (profile, history) => ({
  type: APP_UPDATE_PROFILE,
  payload: { profile, history },
});
export const updateProfileSuccess = () => ({
  type: APP_UPDATE_PROFILE_SUCCESS,
});
export const updateProfileError = (message) => ({
  type: APP_UPDATE_PROFILE_ERROR,
  payload: { message },
});
