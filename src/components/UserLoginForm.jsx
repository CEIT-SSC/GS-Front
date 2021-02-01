import React, {useState, useEffect} from 'react';
import { useDispatch, connect } from 'react-redux';
import { Form, Card, Button, Spinner, Alert } from 'react-bootstrap';

import * as actions from '../store/actions';


const UserLoginForm = ({ loading, error }) => {

    const dispatch = useDispatch();

    const [isSignUp, setIsSignUp] = useState(false);

    const [errorToShow, setErrorToShow] = useState(null);

    const initialForm = [
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter student number',
            isInvalid: false,
            invalidMsg: '',
            value: ''
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            isInvalid: false,
            invalidMsg: '',
            value: ''
        },
        {
            label: 'Re-enter password',
            type: 'password',
            placeholder: 'Enter password again',
            isInvalid: false,
            invalidMsg: '',
            value: ''
        },
    ];
    const [formElements, setFormElements] = useState(initialForm);
    
    useEffect(() => {   
        setErrorToShow(error);
    }, [error])

    const inputChangeHandler = (event, index) => {
        const updatedForm = [ ...formElements ];
        const updatedEl = updatedForm[index];
        updatedEl.value = event.target.value;
        updatedEl.isInvalid = false;
        updatedEl.invalidMsg = '';
        updatedForm[index] = updatedEl;
        setFormElements(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const userData = {
            studentNumber: formElements[0].value,
            password: formElements[1].value
        };
        if(isSignUp){
            if(formElements[1].value === formElements[2].value){
                dispatch(actions.userSignUp(userData));
            } else {
                const updatedForm = [ ...formElements ];
                const updatedEl = updatedForm[2];
                updatedEl.isInvalid = true;
                updatedEl.invalidMsg = 'Passwords does not match.';
                updatedForm[2] = updatedEl;
                setFormElements(updatedForm);
            }
        }
        else dispatch(actions.authUser(userData));
    }

    const form = <>
        <Form
            onSubmit={submitHandler}
        >
            {formElements.map((element, index) => (
                index !== 2 || (index === 2 && isSignUp) ? <Form.Group key={index}>
                    <Form.Label>{element.label}</Form.Label>
                    <Form.Control
                        isInvalid={element.isInvalid}
                        type={element.type}
                        placeholder={element.placeholder}
                        value={formElements[index].value}
                        onChange={(event) => inputChangeHandler(event, index)}
                        required></Form.Control>
                    <Form.Control.Feedback type="invalid" style={{color: 'salmon'}}>
                        {element.invalidMsg}
                    </Form.Control.Feedback>
                </Form.Group> : null
            ))}

            <Button variant="success" type="submit" block>
                {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : isSignUp ? 'Register' : 'Login'}
            </Button>
            <Button variant="secondary" block onClick={() => {
                setErrorToShow(null);
                setFormElements(initialForm);
                setIsSignUp(!isSignUp)
            }}>
                {isSignUp ? 'Login' : 'Register'}
            </Button>
        </Form>
    </>

    return(
        <>
        <Card style={{ width: '400px', margin: '20px' }}>
            <Card.Body>
                <Card.Title className="text-center" style={{ fontSize: '26px' }}>{isSignUp ? 'Register' : 'Login'}</Card.Title>
                {errorToShow != null ?
                        <Alert variant={'danger'}>
                            {errorToShow.message}
                        </Alert> : null}
                {form}
            </Card.Body>
        </Card>
        </>
    );
};

const mapStateToProps = (state) => ({
    error: state.userAuth.error,
    loading: state.userAuth.loading,
})

export default connect(mapStateToProps)(UserLoginForm);