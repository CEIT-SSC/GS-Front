import * as actions from './actionTypes';
import axios from '../../api/axios';
import download from 'downloadjs';


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
        // dispatch(testCaseGetStart());
        const sendReq = async () => {
            try {
                dispatch(testCaseGetStart());
                const response = await axios.get("/question/" +  id + "/testcase" , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                const testCase = response.data;
                download(testCase,"tescase.txt","text/text");
                dispatch(testCaseGetSuccess(testCase));
            }
            catch (error) {
                dispatch(testCaseGetFail(error));
                console.log(error);
            }
        }
        sendReq();

    }
}