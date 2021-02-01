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
        },
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
                    <div style={{marginBottom:'5px', color:'gray'}}>
                        sign in as a new user
                        <input 
                            type='checkbox'
                            onChange={(event)=>inputChangeHandler(event,2)}
                            style={{marginLeft:'5px', marginTop:'3px'}}/>
                    </div>
                    <Button variant="primary" type="submit" block>
                        {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : 'Submit'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
/*<Form.Group>
                        <Form.Control
                            type='checkbox'
                            onChange={(event)=>inputChangeHandler(event,2)}
                        ></Form.Control>
                    </Form.Group>*/
export default UserLoginForm;