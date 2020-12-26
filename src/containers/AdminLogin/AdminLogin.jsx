import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { Container } from './AdminLoginStyle';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import * as actions from '../../store/actions';

const AdminLogin = props => {
    const [formElements, setFromElements] = useState([
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username',
            value: ''
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            value: ''
        }
    ])

    const dispatch = useDispatch()
    const onAuthUser = (userData) => dispatch(actions.authSuperAdmin(userData));
    const {loading, error, isAuthenticated} = props;

    const inputChangeHandler = (event, index) => {
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };
        updatedEl.value = event.target.value;
        updatedForm[index] = updatedEl;
        setFromElements(updatedForm);
    }
    const signinSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {
            username: formElements[0].value,
            password: formElements[1].value
        }
        onAuthUser(userData);
    }
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Container>
            <Card style={{ width: '400px', margin: '20px' }}>
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: '26px' }}>Login</Card.Title>
                    {error != null ?
                        <Alert variant={'danger'}>
                            {error.message}
                        </Alert> : null}
                    <Form
                        onSubmit={signinSubmitHandler}
                    >
                        {formElements.map((element, index) => (
                            <Form.Group key={index}>
                                <Form.Label>{element.label}</Form.Label>
                                <Form.Control
                                    type={element.type}
                                    placeholder={element.placeholder}
                                    value={element.value}
                                    onChange={(event) => inputChangeHandler(event, index)}
                                    required></Form.Control>
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit" block>
                            {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : 'Submit'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </Container>

    );
}

const mapStateToProps = (state) => ({
    error : state.superAdminAuth.error,
    loading : state.superAdminAuth.loading,
    isAuthenticated : state.superAdminAuth.isAuthenticated
})

export default connect(mapStateToProps)(AdminLogin);