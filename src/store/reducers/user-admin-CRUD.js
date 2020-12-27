import * as actions from '../actions/actionTypes';

const initialState = {
    data: null,
    success: false,
    error: null,
    loading: false,
    dataType: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_START:
            return {...state, data: null, success: false, error: null, loading: true, dataType: ''};
        case actions.USER_SUCCESS:
            return {...state, data: action.data, success: true, loading: false, dataType: action.dataType};
        case actions.USER_FAIL:
            return {...state, error: action.error, loading: false};
        default:
            return state;
    }
}

export default reducer;