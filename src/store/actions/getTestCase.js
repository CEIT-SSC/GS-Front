import * as actions from './actionTypes';
import axios from '../../api/axios';


export const testCaseGetStart = () => {
    return {
        type: actions.GET_TESTCASE_START
    }
}

export const testCaseGetSuccess = (testCase) => {
    return {
        type: actions.GET_TESTCASE_SUCCESS,
        testCase
    }
}

export const testCaseGetFail = (error) => {
    return {
        type: actions.GET_TESTCASE_FAIL,
        error
    }
}

export const getTestCase = (id , token) => {
    return (dispatch) => {
        dispatch(testCaseGetStart());
        const sendReq = async () => {
            try {
                const response = await axios.get("/question/" +  id + "/testcase" , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                const testCase = null;
                testCase = response.data;
                dispatch(testCaseGetSuccess(testCase));
            }
            catch (error) {
                dispatch(testCaseGetFail(error))
            }
        }
        sendReq();

    }
}