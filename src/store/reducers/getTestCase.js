import * as actions from '../actions/actionTypes';

const initialState= {
    testCase:null,
    success:false,
    error:null
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_TESTCASE_START:
            return {...state , success:false, error:null ,testCase:null};
            
        case actions.GET_TESTCASE_SUCCESS:
            return {...state , success:true, error:null, testCase:action.testCase};
            
        case actions.GET_TESTCASE_FAIL:
            return {...state , success:false, error:action.error , testCase:null};
            
                
        default:
            return state;
            
    }

} 

export default reducer;