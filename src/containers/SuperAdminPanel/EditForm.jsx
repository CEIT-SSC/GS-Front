import React, { useState , useEffect } from 'react';
import {Form, Row, Col,Button,Spinner} from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';

import * as actions from '../../store/actions';


const EditForm = (props) => {

    const dispatch=useDispatch();
    const {loading, error, dataType,token} = props;
    let usernameVal = '';
    if(props.userToEdit != null) {
        if( dataType === 'user'){
            usernameVal= props.userToEdit.studentNumber; 
        }
        else if( dataType === 'QAdmin' ){
            usernameVal = props.userToEdit.username;
        }
    }
    const [formElements, setFromElements] = useState([
        {
            type: 'text',
            placeholder: 'Enter username',
            value: usernameVal,
            required: true
        },
        {
            type: 'password',
            placeholder: 'Enter password',
            value: '',
            required : props.userToEdit === null
        }
    ])

    const inputChangeHandler = (event, index) => {
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };
        updatedEl.value = event.target.value;
        updatedForm[index] = updatedEl;
        setFromElements(updatedForm);
    }


    const onSubmitHandler = (event) => {
        
        if( dataType === 'user'){
            if(props.userToEdit === null){
                const userData = {
                    studentNumber: formElements[0].value,
                    password: formElements[1].value
                };
                dispatch(actions.addUser(token,userData));
            }
            else {
                let userData = null;
                if(formElements[1].value === ''){
                    userData ={
                        studentNumber : formElements[0].value
                    };
                }
                else {
                    userData = {
                        studentNumber: formElements[0].value,
                        password: formElements[1].value
                    }; 
                }
                dispatch(actions.editUser(token,userData));

            }
        }
        else if( dataType === 'QAdmin'){
            if(props.userToEdit===null){
                const adminData = {
                    username: formElements[0].value,
                    password: formElements[1].value
                };
                dispatch(actions.addQAdmin(token,adminData));
            }
            else {
                let adminData = null;
                if(formElements[1].value === ''){
                    adminData ={
                        studentNumber : formElements[0].value
                    };
                }
                else {
                    adminData = {
                        studentNumber: formElements[0].value,
                        password: formElements[1].value
                    }; 
                }
                dispatch(actions.editQAdmin(token,adminData));

            }
        }
    }
    

    return(
    <Form style={{padding:'20px'}}
    onSubmit={onSubmitHandler}
    >
        {formElements.map((element, index) => (
                            <Form.Group key={index}>
                                <Form.Label>{element.label}</Form.Label>
                                <Form.Control
                                    type={element.type}
                                    placeholder={element.placeholder}
                                    value={element.value}
                                    onChange={(event) => inputChangeHandler(event, index)}
                                    required={element.required}></Form.Control>
                            </Form.Group>
                        ))}
       
        <Button variant="primary" type="submit" block>
            {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : 'Submit'}
        </Button>
    </Form>
    )
}

const mapStateToProps = (state) => ({
    token: state.userAdminCRUD.token,
    dataType: state.userAdminCRUD.dataType,
    loading: state.userAdminCRUD.loading,
    error: state.userAdminCRUD.error,
})

export default connect(mapStateToProps)(EditForm);