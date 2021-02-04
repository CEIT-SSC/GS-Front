import * as actions from './actionTypes';
import axios from '../../api/axios';


export const questionsFetchStart = () => ({
    type: actions.FETCH_USER_QUESTIONS_START
})

export const questionsFetchSuccess = (questions) => ({
    type: actions.FETCH_USER_QUESTIONS_SUCCESS,
    questions
})

export const questionsFetchFailure = (error) => ({
    type: actions.FETCH_USER_QUESTIONS_FAILURE,
    error
})


export const fetchUserQuestions = (token) => {
    return (dispatch) => {
        dispatch(questionsFetchStart());
        const sendReq = async () => {
            try {
                const response = await axios.get("/user/me/getquestion", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch(questionsFetchSuccess(response.data));
            }
            catch (error) {
                dispatch(questionsFetchFailure(error.response && error.response.data.error ? error.response.data.error : error.message))
            }
        }
        sendReq();

    }
}