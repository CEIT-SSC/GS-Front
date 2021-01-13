import * as actions from '../actions/actionTypes';

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
    createSuccess: false,
    createError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_QUESTIONS_START:
            return { ...initialState, loading: true };
        case actions.FETCH_QUESTIONS_SUCCESS:
            return { ...state, data: action.data, success: true, loading: false };
        case actions.FETCH_QUESTIONS_FAIL:
            return { ...state, error: action.error, loading: false };
        case actions.CREATE_QUESTIONS_SUCCESS:
            return { ...state, createSuccess: true, loading: false };
        case actions.CREATE_QUESTIONS_ERROR:
            return { ...state, createError: action.error, loading: false };
        default:
            return state;
    }
}

export default reducer;