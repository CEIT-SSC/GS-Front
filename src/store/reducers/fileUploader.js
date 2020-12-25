import * as actions from '../actions/actionTypes';

const initialState= {
    data:null,
    success:false,
    error:null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.UPLOAD_FILE_START:
            return {...state , success:false, error:null ,data:null};
            
        case actions.UPLOAD_FILE_SUCCESS:
            return {...state , success:true, error:null, data:action.data};
            
        case actions.UPLOAD_FILE_FAILURE:
            return {...state , success:false, error:action.error , data:null};
            
                
        default:
            return state;
            
    }

} 

export default reducer;