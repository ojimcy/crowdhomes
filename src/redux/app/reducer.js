import {
  APP_GET_ACTIVE_SUBSCRIPTION,
  APP_GET_PACKAGES,
  APP_GET_PACKAGES_ERROR,
  APP_GET_PACKAGES_SUCCESS,
  APP_GET_ACTIVE_SUBSCRIPTION_SUCCESS,
  APP_GET_ACTIVE_SUBSCRIPTION_ERROR,
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

const INIT_STATE = {
  packages: [],
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case APP_GET_PACKAGES:
      return { ...state, loading: true, error: '' };
    case APP_GET_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        packages: action.payload,
        error: '',
      };
    case APP_GET_PACKAGES_ERROR:
      return {
        ...state,
        loading: false,
        packages: [],
        error: action.payload.message,
      };
    case APP_GET_ACTIVE_SUBSCRIPTION:
      return {
        ...state,
        loading: true,
      };
    case APP_GET_ACTIVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        activeSubscription: action.payload,
        loading: false,
      };
    case APP_GET_ACTIVE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        activeSubscription: null,
        error: action.payload.message,
        loading: false,
      };
    case APP_SET_NO_ACTIVE_SUBSCRIPTION:
      return {
        ...state,
        noActiveSubscription: action.payload,
      };
    case APP_MY_REFERRAL_COUNT:
      return {
        ...state,
        loading: true,
      };
    case APP_MY_REFERRAL_COUNT_SUCCESS:
      return {
        ...state,
        myReferralCount: action.payload,
        loading: false,
      };
    case APP_MY_REFERRAL_COUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case APP_GET_RECENT_EARNINGS:
      return {
        ...state,
        loading: true,
      };
    case APP_GET_RECENT_EARNINGS_SUCCESS:
      return {
        ...state,
        recentEarnings: action.payload,
        loading: false,
      };
    case APP_GET_RECENT_EARNINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case APP_UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
        updateProfileSuccessMessage: '',
      };
    case APP_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProfileSuccessMessage: 'Profile updated',
      };
    case APP_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        updateProfileSuccessMessage: '',
      };
    default:
      return { ...state };
  }
};
