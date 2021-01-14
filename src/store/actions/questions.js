import * as actions from './actionTypes';
import axios from '../../api/axios';

const fetchQestionsStart = () => (
    {
        type: actions.FETCH_QUESTIONS_START
    }
)

const fetchQestionsFail = (error) => (
    {
        type: actions.FETCH_QUESTIONS_FAIL,
        error
    }
)

const fetchQestionsSuccess = (data) => (
    {
        type: actions.FETCH_QUESTIONS_SUCCESS,
        data
    }
)

const createQuestionSuccess = () => ({
    type: actions.CREATE_QUESTIONS_SUCCESS
})

const createQuestionFail = (error) => ({
    type: actions.CREATE_QUESTIONS_ERROR,
    error
})

const editQuestionSuccess = () => ({
    type: actions.EDIT_QUESTIONS_SUCCESS
})

const editQuestionFail = (error) => ({
    type: actions.EDIT_QUESTIONS_ERROR,
    error
})

export const getQuestions = (token) => dispatch => {
    dispatch(fetchQestionsStart());
    axios.get("/question", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch(fetchQestionsSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchQestionsFail(error));
        });
}

export const addQuestion = (token, data) => dispatch => {
    dispatch(fetchQestionsStart());
    axios.post("/question" , data , {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {dispatch(createQuestionSuccess())})
    .catch(error => {
        console.log(error);
        dispatch(createQuestionFail(error));
    });
}

export const deleteQuestion = (token, id) => dispatch => {
    dispatch(fetchQestionsStart());
    axios.delete("/question/"+ id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {dispatch(getQuestions(token))})
    .catch(error => {
     dispatch(fetchQestionsFail(error));
    });
    
}

export const editQuestion = (token, data, id) => dispatch => {
    dispatch(fetchQestionsStart());
    axios.patch("/question/"+ id ,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {dispatch(editQuestionSuccess())})
    .catch(error => {
     dispatch(editQuestionFail(error));
    });
} 


