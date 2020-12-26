import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Container } from './AdminLoginStyle';

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

    const inputChangeHandler = (event, index) => {
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };
        updatedEl.value = event.target.value;
        updatedForm[index] = updatedEl;
        setFromElements(updatedForm);
    }

    return (
        <Container>
            <Card style={{ width: '400px', margin: '20px' }}>
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: '26px' }}>Login</Card.Title>
                    <Form>
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
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </Container>

    );
}

export default AdminLogin;