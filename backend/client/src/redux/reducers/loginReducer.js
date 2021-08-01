import { handleActions } from 'redux-actions';
import { LoginState } from '../constants/models';
import {
    GET_ISLOGIN,
    SET_LOGIN,
    SET_LOGOUT
} from '../constants/actionTypes';

const loginReducer = handleActions({
SET_LOGIN: (state) => (
    state.set(
        'isLogin',true
    )
),
SET_LOGOUT: (state) => (
    state.set(
        'isLogin',false
    )
)
},LoginState);

export default loginReducer;