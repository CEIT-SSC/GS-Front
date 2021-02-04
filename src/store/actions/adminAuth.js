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

export const authSuperAdmin = (userData, adminType) => {
    return dispatch => {
        dispatch(authStart());
        
        let url = adminType === 'Question Admin' ? '/questionadmin/login' : '/superarea/login';
        
        axios.post(url, userData)
            .then(response => {
                const username = adminType === 'Question Admin' ? response.data.questionAdmin.username : response.data.admin.username;
                dispatch(authSuccess(response.data.token, username));
            })
            .catch(error => {
                dispatch(authFail(error.response && error.response.data.error ? error.response.data.error : error.message));
            });
    }
}

export const logoutSuperAdmin = (token, adminType) => {
    return dispatch => {
        let url = adminType === 'Question Admin' ? '/questionadmin/me/logout' : '/superarea/logout';
        try {   
            axios.post(url, {
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
