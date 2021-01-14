import * as actionTypes from './actionTypes';
import axios from '../../api/axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username,
        token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authUser = (userData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("/user/login", userData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.user.studentNumber));
                console.log(response.data.token);
                
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}

export const logoutUser = (token) => {
    return dispatch => {
        try {
            axios.post('/user/me/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(logoutSuccess());
        } catch (error) {
            console.log(error);
        }
    }
}