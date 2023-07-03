// actions.js
// Import action types
import { SET_TOKEN, SET_USER, SET_SIDEBAR_SHOW } from './actionTypes';


// Action creators
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setSidebarShow = (show) => {
  return {
    type: SET_SIDEBAR_SHOW,
    payload: show,
  };
};