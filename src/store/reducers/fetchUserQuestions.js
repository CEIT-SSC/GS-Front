import * as actions from '../actions/actionTypes';

const initialState ={
    questions:null,
    success:false,
    error:null,
    loading: false
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USER_QUESTIONS_START:
            return {...state , success:false, error:null ,questions:null, loading: true};
            
        case actions.FETCH_USER_QUESTIONS_SUCCESS:
            return {...state , success:true, error:null, questions:action.questions, loading: false};
            
        case actions.FETCH_USER_QUESTIONS_FAILURE:
            return {...state , success:false, error:action.error , questions:null, loading: false};
                
        default:
            return state;
            
    }

} 

export default reducer;