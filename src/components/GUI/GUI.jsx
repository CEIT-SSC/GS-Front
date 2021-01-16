import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';

import * as actions from '../../store/actions';
import { Container } from './GUIStyle';
import UserLoginForm from '../UserLoginForm';
import GUIQuestions from '../GUIQuestions/GUIQuestions';

const GUI = props => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })
    const [selectedQIndex, setSelectedQIndex] = useState(0);
    const { token, authError, authLoading, questionsLoading, questionsErr, questions } = props;

    useEffect(() => {
        if (token != null) {
            dispatch(actions.fetchUserQuestions(token));
        }
    }, [token, dispatch])

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
            loading={authLoading}
            error={authError}
            onSubmitHandler={loginSubmitHandler}
            formValues={formValues}
            inputChangeHandler={inputChangeHandler}
        />
    } else {
        if (questionsLoading) {
            content = <Spinner animation="border" />
        } else if (questionsErr) {
            content = <Alert variant="danger">{questionsErr.message}</Alert>
        } else if (questions) {
            content = <GUIQuestions 
                questions={questions}
                qClickHandler={setSelectedQIndex}
                selectedQIndex={selectedQIndex}
            />

        }
    }

    return (
        <Container style={{padding: 0, overflow: 'hidden'}}>
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
        questionsErr: state.userQuestions.error,
        questionsLoading: state.userQuestions.loading,
    }
}

export default connect(mapStateToProps)(GUI);