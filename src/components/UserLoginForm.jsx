import React from 'react';
import { Form, Card, Button, Spinner, Alert } from 'react-bootstrap';


const UserLoginForm = ({loading, error, onSubmitHandler, formValues, inputChangeHandler}) => {
    const formElements = [
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter student number'
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password'
        }
    ];

    

    return(
        <Card style={{ width: '400px', margin: '20px' }}>
            <Card.Body>
                <Card.Title className="text-center" style={{ fontSize: '26px' }}>Login</Card.Title>
                {error != null ?
                        <Alert variant={'danger'}>
                            {error.message}
                        </Alert> : null}
                <Form
                onSubmit={onSubmitHandler}
                >
                    {formElements.map((element, index) => (
                        <Form.Group key={index}>
                            <Form.Label>{element.label}</Form.Label>
                            <Form.Control
                                type={element.type}
                                placeholder={element.placeholder}
                                value={index === 0 ? formValues.username : formValues.password}
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
    );
};

export default UserLoginForm;