import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    isAuthenticated: false,
    username: "user",
    error: null,
    token: null
}

const authSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        loading: false,
        username: action.username,
        token: action.token
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_AUTH_START: return({...state, loading: true, error: null, token: null});
        case actionTypes.USER_AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.USER_AUTH_FAIL: return ({...state, loading: false, error: action.error});
        case  actionTypes.USER_AUTH_LOGOUT: return({...state, loading: false, isAuthenticated: false, userId: null, username: "user", token: null})
        default: return state;
    }
}

export default reducer;