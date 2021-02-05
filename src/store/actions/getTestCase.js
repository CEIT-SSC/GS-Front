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

export const getTestCase = (id ,name, token, dirDownload , html) => {
    return (dispatch) => {
        const sendReq = async () => {
            try {
                dispatch(testCaseGetStart());
                let response=null;
                response = await axios.get("/question/" +  id + "/testcase" , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const testCase = response.data;
                if(dirDownload && html==false) {
                    download(testCase,name+"testcase.txt","text/text");
                }
                else if(dirDownload && html){
                    const blob= new Blob([testCase] , {type: 'text/html;charset=UTF-8'});
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = name+"testcase.html";
                    a.click();
                    
                }
                dispatch(testCaseGetSuccess(testCase));
            }
            catch (error) {
                dispatch(testCaseGetFail(error.response && error.response.data.error ? error.response.data.error : error.message));
            }
        }
        sendReq();

    }
}