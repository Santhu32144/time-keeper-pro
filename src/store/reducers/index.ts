import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import sidebarReducer from './sidebarReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  users: userReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
