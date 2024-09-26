/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
})

export default rootReducer
