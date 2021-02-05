import * as actionTypes from '../actions/actionTypes';

const initialState = 'LIGHT';

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SWITCH_THEME:
            localStorage.setItem('theme', state === 'LIGHT' ? 'DARK' : 'LIGHT');
            return state === 'LIGHT' ? 'DARK' : 'LIGHT'
        default:
            return state;
    }
}

export default reducer;