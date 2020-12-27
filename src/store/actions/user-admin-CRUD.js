import * as actions from './actionTypes';
import axios from '../../api/axios';

const userStart = () => (
    {
        type: actions.USER_START
    }
)

const userFail = (error) => (
    {
        type: actions.USER_FAIL,
        error
    }
)

const userSuccess = (data, dataType) => (
    {
        type: actions.USER_SUCCESS,
        data,
        dataType
    }
)

export const getUsers = (token) => dispatch => {
    dispatch(userStart());

    axios.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(userSuccess(response.data, 'user'));
        })
        .catch(error => {
            dispatch(userFail(error));
        });
}

export const getQAdmins = (token) => dispatch => {
    dispatch(userStart());

    axios.get("/questionadmin", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(userSuccess(response.data, 'QAdmin'));
        })
        .catch(error => {
            dispatch(userFail(error));
        });
}