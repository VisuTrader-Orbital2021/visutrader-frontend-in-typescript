import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token : string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

// TODO: find the right type for error
export const authFail = (error : any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.message,
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (username : string, password : string) => {
    // @ts-ignore type exist
    return (dispatch) => {
        dispatch(authStart());
        axios.post(url + 'rest-auth/login/', {
            username: username,
            password: password,
        }).then(response => {
            const token = response.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
        }).catch(error => {
            dispatch(authFail(error));
        });
    }
}

export const authSignUp = (username : string, email : string, password : string) => {
    // @ts-ignore type exist
    return (dispatch) => {
        dispatch(authStart());
        axios.post(url + 'rest-auth/registration/', {
            username: username,
            email: email,
            password1: password,
            password2: password,
        }).then(response => {
            const token = response.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
        }).catch(error => {
            dispatch(authFail(error));
        });
    }
}

const url = 'http://127.0.0.1:8000/'