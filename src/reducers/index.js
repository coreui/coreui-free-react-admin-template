/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import appReducer from './appReducer'
import jiraReducer from './jiraReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    jira: jiraReducer,
})

export default rootReducer
