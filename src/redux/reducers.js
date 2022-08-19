import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import appData from './app/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  appData,
});

export default reducers;
