import * as actionTypes from './actionTypes';
import axios from '../../api/axios';

const EXPIRE_IN = 24 * 3600 * 1000;

export const authStart = () => {
    return {
        type: actionTypes.USER_AUTH_START
    }
}

export const authSuccess = (token, username) => {
    const expirationDate = new Date(new Date().getTime() + EXPIRE_IN);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('username', username);
    return {
        type: actionTypes.USER_AUTH_SUCCESS,
        username,
        token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.USER_AUTH_FAIL,
        error
    }
}

export const logoutSuccess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: actionTypes.USER_AUTH_LOGOUT
    }
}


export const authUser = (userData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("/user/login", userData)
            .then(response => {
                dispatch(authSuccess(response.data.token, response.data.user.studentNumber));
                dispatch(checkAuthTimeout(EXPIRE_IN, response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error.response && error.response.data.error ? error.response.data.error : error.message));
            });
    }
}

export const userSignUp = (userData) =>{
    return dispatch => {
        dispatch(authStart());
        axios.post("/user/" , userData)
            .then(response => {
                dispatch(authSuccess(response.data.token, response.data.user.studentNumber));
                dispatch(checkAuthTimeout(EXPIRE_IN, response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error.response && error.response.data.error ? error.response.data.error : error.message));
            });
    }   
}

export const logoutUser = (token) => {
    return dispatch => {
        try {
            axios.post('/user/me/logout', null ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(logoutSuccess());
        } catch (error) {
            console.log(error.response && error.response.data.error ? error.response.data.error : error.message);
        }
    }
}

export const checkAuthTimeout = (expirationTime, token) => {
    return dispatch => {
        setTimeout(() => {
            if(token){
                dispatch(logoutUser(token));
            } else {
                dispatch(logoutSuccess());
            }
        }, expirationTime);
    };
};

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) { 
            dispatch(logoutSuccess());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logoutUser(token));
            } else {
                const userame = localStorage.getItem('username');
                dispatch(authSuccess(token, userame));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()), token));
            }   
        }
    }
}