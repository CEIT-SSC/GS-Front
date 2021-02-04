import React, { useState } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { Container } from './AdminLoginStyle';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import * as actions from '../../store/actions';

const AdminLogin = props => {
    const [adminType, setAdminType] = useState('Super Admin');
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
    const onAuthUser = (userData, adminType) => dispatch(actions.authSuperAdmin(userData, adminType));
    const { loading, error, isAuthenticated } = props;

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
        onAuthUser(userData, adminType);
    }
    if (isAuthenticated) {
        const path = adminType === 'Question Admin' ? '/panel/questionadmin' : '/panel/superadmin';
        return <Redirect to={path} />
    }
    return (
        <Container>
            <Card style={{ width: '400px', margin: '20px' }}>
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: '26px' }}>Login</Card.Title>
                    {error != null ?
                        <Alert variant={'danger'}>
                            {error}
                        </Alert> : null}
                    <Form
                        onSubmit={signinSubmitHandler}
                    >
                         <Form.Group>
                            <Form.Control as="select" value={adminType} onChange={(event) => {setAdminType(event.target.value)}}>
                                <option>Super Admin</option>
                                <option>Question Admin</option>
                            </Form.Control>
                         </Form.Group>
                        
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
                        <Button variant="success" type="submit" block>
                            {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : 'Submit'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </Container>

    );
}

const mapStateToProps = (state) => ({
    error: state.adminAuth.error,
    loading: state.adminAuth.loading,
    isAuthenticated: state.adminAuth.isAuthenticated
})

export default connect(mapStateToProps)(withRouter(AdminLogin));