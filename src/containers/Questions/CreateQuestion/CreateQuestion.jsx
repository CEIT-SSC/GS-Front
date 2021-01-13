import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import QuestionForm from './../../../components/QuestionForm';
import * as actions from '../../../store/actions';


const CreateQuestion = (props) => {

    const dispatch = useDispatch();

    const [examples, setExamples] = useState([]);

    const { loading, token, success, error } = props;
  
    const [formValues, setFormValues] = useState(['', '', '', '', '', '']);

    const submitHandler = (event) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('date', new Date(formValues[0]).getTime());
        bodyFormData.append('name', formValues[1]);
        bodyFormData.append('body', formValues[2]);
        bodyFormData.append('score', formValues[3]);
        bodyFormData.append('testGenerator', formValues[4].files[0]);
        bodyFormData.append('answer', formValues[5].files[0]);
        bodyFormData.append('examples', JSON.stringify(examples));
        dispatch(actions.addQuestion(token, bodyFormData));
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