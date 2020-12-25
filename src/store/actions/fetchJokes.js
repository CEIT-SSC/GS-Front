import * as actions from './actionTypes';
import axios from 'axios';


export const jokesFetchStart = () => {
    return {
        type: actions.FETCH_JOKES_START
    }
}

export const jokesFetchSuccess = (jokes) => {
    return {
        type: actions.FETCH_JOKES_SUCCESS
    }
}

export const jokesFetchFailure = (error) => {
    return {
        type: actions.FETCH_JOKES_FAILURE,
        error
    }
}

export const fetchJokes = (arg) => {
    return (dispatch) => {
        dispatch(jokesFetchStart());
        const sendReq = async () => {
            try {
                const response = await axios.get("http://api.icndb.com/jokes/random/" + arg);
                const jokes = response.data.value.map(el => el.joke + "\n");
                dispatch(jokesFetchSuccess(jokes));
            }
            catch (err) {
                dispatch(jokesFetchFailure(err))
            }
        }
        sendReq();

    }
}