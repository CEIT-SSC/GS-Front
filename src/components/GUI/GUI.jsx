import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
// import { Form, Spinner, Alert, Button, Card } from 'react-bootstrap';

import * as actions from '../../store/actions';
import { Container } from './GUIStyle';
import UserLoginForm from '../UserLoginForm';

const GUI = props => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const { token, authError, authLoading } = props;

    const inputChangeHandler = (event, index) => {
        const updatedForm = { ...formValues };
        if (index === 0) {
            updatedForm.username = event.target.value;
        } else {
            updatedForm.password = event.target.value;
        }
        setFormValues(updatedForm);
    }

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {
            studentNumber: formValues.username,
            password: formValues.password
        };
        dispatch(actions.authUser(userData));
    }

    let content = null;
    if (token === null) {
        content = <UserLoginForm
            loading = {authLoading} 
            error = {authError} 
            onSubmitHandler = {loginSubmitHandler} 
            formValues = {formValues}
            inputChangeHandler = {inputChangeHandler}
        />
    }

    return (
        <Container>
            {content}
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        upFileSuc: state.fileUploader.success,
        upFileErr: state.fileUploader.error,
        authError: state.userAuth.error,
        token: state.userAuth.token,
        authLoading: state.userAuth.loading,
        username: state.userAuth.username,
        questions: state.userQuestions.questions,
        questionsSuccess: state.userQuestions.success,
        questionsErr: state.userQuestions.error
    }
}

export default connect(mapStateToProps)(GUI);