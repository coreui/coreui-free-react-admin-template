// reducer.js
// Import action types
import { SET_TOKEN, SET_USER, SET_SIDEBAR_SHOW } from './actionTypes';

// Initial state
const initialState = {
  sidebarShow: true,
  token: null,
  user: null
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
