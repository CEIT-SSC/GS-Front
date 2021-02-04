import * as actions from './actionTypes';
import axios from '../../api/axios';


export const scoreBoardGetStart = () => {
    return {
        type: actions.GET_SCOREBOARD_START
    }
}

export const scoreBoardGetSuccess = (scores) => {
    return {
        type: actions.GET_SCOREBOARD_SUCCESS,
        scores
    }
}

export const scoreBoardGetFail = (error) => {
    return {
        type: actions.GET_SCOREBOARD_FAIL,
        error
    }
}

export const getScoreBoard = (scores) => {
    return (dispatch) => {
        dispatch(scoreBoardGetStart());
        const sendReq = async () => {
            try {
                const response = await axios.get("/scoreboard" );
                console.log(response);
                scores = response.data;
                dispatch(scoreBoardGetSuccess(scores));
            }
            catch (error) {
                dispatch(scoreBoardGetFail(error.response && error.response.data.error ? error.response.data.error : error.message))
            }
        }
        sendReq();

    }
}