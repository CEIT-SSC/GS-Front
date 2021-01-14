import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import QuestionForm from '../../components/QuestionForm';
import * as actions from '../../store/actions';


const EditQuestion = (props) => {
    const questionToEdit = props.location.state.questionToEdit;
    const dispatch = useDispatch();

    const [examples, setExamples] = useState(questionToEdit.examples);

    const { loading, token, success, error } = props;
    
    //create formatted date for date input
    let date = new Date(questionToEdit.forDate);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    const forDate = date.toISOString().slice(0, -1);

    const [formValues, setFormValues] = useState([forDate, questionToEdit.name, questionToEdit.body, questionToEdit.score, '', '']);

    const submitHandler = (event) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        console.log(new Date(formValues[0]).getTime());
        bodyFormData.append('forDate', new Date(formValues[0]).getTime());
        bodyFormData.append('name', formValues[1]);
        bodyFormData.append('body', formValues[2]);
        bodyFormData.append('score', formValues[3]);
        if(formValues[4].value && formValues[4].value !== ''){
            console.log(formValues[4].value);
            bodyFormData.append('testGenerator', formValues[4].files[0]);
        }
        if(formValues[5].value && formValues[5].value !== ''){
            bodyFormData.append('answer', formValues[5].files[0]);
        }
        bodyFormData.append('examples', JSON.stringify(examples));
        dispatch(actions.editQuestion(token, bodyFormData, questionToEdit._id));
    }
    if(token === null){
        return <Redirect to="/login/admin" />
    }
    if(success){
        return <Redirect to="/list/questions" />
    }
    return (
        <QuestionForm
            edit
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
    error: state.questions.editError,
    success: state.questions.editSuccess
})

export default connect(mapStateToProps)(withRouter(EditQuestion));