import { combineReducers } from '@reduxjs/toolkit';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  alert,
  auth,
});
