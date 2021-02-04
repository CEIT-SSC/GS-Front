import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';

import * as actions from '../../store/actions';
import { Container } from './GUIStyle';
import UserLoginForm from '../UserLoginForm';
import GUIQuestions from '../GUIQuestions/GUIQuestions';

const GUI = props => {

    const dispatch = useDispatch();

    const [selectedQIndex, setSelectedQIndex] = useState(0);
    const { token, questionsLoading, questionsErr, questions } = props;

    useEffect(() => {
        if (token != null) {
            dispatch(actions.fetchUserQuestions(token));
        }
    }, [token, dispatch])

    let content = null;
    if (token === null) {
        content = <UserLoginForm />
    } else {
        if (questionsLoading) {
            content = <Spinner animation="border" />
        } else if (questionsErr) {
            content = <Alert variant="danger">{questionsErr}</Alert>
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
        token: state.userAuth.token,
        questions: state.userQuestions.questions,
        questionsErr: state.userQuestions.error,
        questionsLoading: state.userQuestions.loading,
    }
}

export default connect(mapStateToProps)(GUI);