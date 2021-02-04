import * as actions from './actionTypes';
import axios from 'axios';


export const jokesFetchStart = () => {
    return {
        type: actions.FETCH_JOKES_START
    }
}

export const jokesFetchSuccess = (jokes) => {
    return {
        type: actions.FETCH_JOKES_SUCCESS,
        jokes
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
                let jokes=null;
                const url="http://api.icndb.com/jokes/random/" + arg;
                if(url==="http://api.icndb.com/jokes/random/undefined") arg=null;
                const response = await axios.get(url);
                console.log(response);
                if(arg===null) jokes=null;
                else jokes = response.data.value.map(el => el.joke + "\n");
                dispatch(jokesFetchSuccess(jokes));
            }
            catch (error) {
                dispatch(jokesFetchFailure(error.response && error.response.data.error ? error.response.data.error : error.message))
            }
        }
        sendReq();

    }
}