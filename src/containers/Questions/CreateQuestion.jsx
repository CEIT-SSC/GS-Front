import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import QuestionForm from '../../components/QuestionForm';
import * as actions from '../../store/actions';


const CreateQuestion = (props) => {

    const dispatch = useDispatch();

    const [examples, setExamples] = useState([]);

    const { loading, token, success, error } = props;
  
    /**
     * index: 0 name
     * index: 1 body
     * index: 2 isWeb
     * index: 3 date
     * index: 4 score
     * index: 5 testGenerator
     * index: 6 answer
     */
    const [formValues, setFormValues] = useState(['', '', '', '', '', '', '']);

    const submitHandler = (event) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('name', formValues[0]);
        bodyFormData.append('body', formValues[1]);
        bodyFormData.append('isWeb', formValues[2]);
        bodyFormData.append('date', new Date(formValues[3]).getTime());
        bodyFormData.append('score', formValues[4]);
        bodyFormData.append('testGenerator', formValues[5].files[0]);
        bodyFormData.append('answer', formValues[6].files[0]);
        bodyFormData.append('examples', JSON.stringify(examples));
        dispatch(actions.addQuestion(token, bodyFormData));
    }
    if(token === null){
        return <Redirect to="/login/admin" />
    }
    if(success){
        return <Redirect to="/list/questions" />
    }
    return (
        <QuestionForm
            loading={loading}
            error={error}
            formValues={formValues}
            setFormValues={setFormValues}
            examples={examples}
            setExamples={setExamples}
            onSubmitHandler={submitHandler}
        />
    )
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    loading: state.questions.loading,
    error: state.questions.createError,
    success: state.questions.createSuccess
})

export default connect(mapStateToProps)(CreateQuestion);