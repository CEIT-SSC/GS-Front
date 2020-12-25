import * as actions from './actionTypes';
import axios from 'axios';


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

export const uploadFile = (files) => {
    return (dispatch) => {
        dispatch(fileUploadStart());
        const data = new FormData()
        for (let el in files) {
            data.append('files', files[el]);
        }
        axios.post("http://localhost:5000/files", data, { 
        })
            .then(res => { 
                dispatch(fileUploadSuccess(files));
            })
            .catch(err => { dispatch(fileUploadFailure(err)) })
    }
}