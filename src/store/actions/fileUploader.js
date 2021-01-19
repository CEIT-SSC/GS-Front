import * as actions from './actionTypes';
import axios from '../../api/axios';


export const fileUploadStart = () => {
    return {
        type: actions.UPLOAD_FILE_START
    }
}

export const fileUploadSuccess = (files) => {
    return {
        type: actions.UPLOAD_FILE_SUCCESS
    }
}

export const fileUploadFailure = (error) => {
    return {
        type: actions.UPLOAD_FILE_FAILURE,
        error
    }
}

export const uploadFile = (data, token) => {
    return (dispatch) => {
        dispatch(fileUploadStart());
        
        axios.post("/question/submit", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => { 
                dispatch(fileUploadSuccess(data));
            })
            .catch(err => { dispatch(fileUploadFailure(err)) })
    }
}