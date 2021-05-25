import { combineReducers } from "redux";


const initialState = {
    sidebarShow: 'responsive'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }

const rootReducer = combineReducers({
    nav: changeState,
});

export default rootReducer;