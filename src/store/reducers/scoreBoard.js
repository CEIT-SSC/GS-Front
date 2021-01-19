import * as actions from '../actions/actionTypes';

const initialState = {
    scores: null , 
    error : null , 
    success : false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_SCOREBOARD_START:
            return {...state , success:false, error:null ,jokes:null};
            
        case actions.GET_SCOREBOARD_SUCCESS:
            return {...state , success:true, error:null, scores:action.scores};
            
        case actions.GET_SCOREBOARD_FAIL:
            return {...state , success:false, error:action.error , scores:null};
            
                
        default:
            return state;
            
    }

}

export default reducer; 

