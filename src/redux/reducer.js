import { combineReducers } from 'redux'
import initReducer from './modules/init'
import { userSignReducer } from './modules/userSign'
import { userNonceReducer } from './modules/userNonce'

const rootReducer = combineReducers({
  init: initReducer,
  userSign: userSignReducer,
  userNonce: userNonceReducer,
})

export default rootReducer
