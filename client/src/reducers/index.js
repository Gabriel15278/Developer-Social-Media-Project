import { combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
});
