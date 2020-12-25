import * as actions from '../actions/actionTypes';

const initialState ={
    jokes:null,
    success:false,
    error:null
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.FETCH_JOKES_START:
            return {...state , success:false, error:null ,jokes:null};
            
        case actions.FETCH_JOKES_SUCCESS:
            return {...state , success:true, error:null, jokes:action.jokes};
            
        case actions.FETCH_JOKES_FAILURE:
            return {...state , success:false, error:action.error , jokes:null};
            
                
        default:
            return state;
            
    }

} 

export default reducer;