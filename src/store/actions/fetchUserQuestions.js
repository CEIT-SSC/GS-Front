import * as actions from './actionTypes';
import axios from '../../api/axios';


export const questionsFetchStart = () => {
    return {
        type: actions.FETCH_USER_QUESTIONS_START
    }
}

export const questionsFetchSuccess = (questions) => {
    return {
        type: actions.FETCH_USER_QUESTIONS_SUCCESS,
        questions
    }
}

export const questionsFetchFailure = (error) => {
    return {
        type: actions.FETCH_USER_QUESTIONS_FAILURE,
        error
    }
}

export const fetchUserQuestions = (token) => {
    return (dispatch) => {
        dispatch(questionsFetchStart());
        const sendReq = async () => {
            try {
                const response = await axios.get("/user/me/getquestion" , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // const questions = response.data;
                console.log(response);
                dispatch(questionsFetchSuccess(response.data.map((el,index)=>el)));
            }
            catch (error) {
                dispatch(questionsFetchFailure(error))
            }
        }
        sendReq();

    }
}