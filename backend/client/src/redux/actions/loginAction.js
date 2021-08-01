import { createAction } from 'redux-actions';
import {
    GET_ISLOGIN,
    SET_LOGIN,
    SET_LOGOUT
} from '../constants/actionTypes';

import {isLoginChecker} from '../../in/isLogin';
export const getIslogin = () => (
    (dispatch) => {
        dispatch({type:GET_ISLOGIN})
        if (isLoginChecker()===true){
            dispatch({type:SET_LOGIN});
        }else{
            dispatch({type:SET_LOGOUT});
        }
    }
)


