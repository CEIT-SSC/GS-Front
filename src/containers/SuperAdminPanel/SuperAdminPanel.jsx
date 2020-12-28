import React, { useState } from 'react';
import { Navbar, Button, Modal, Spinner, Alert, Card , Form , Row, Col} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import { Container, MainButton } from './SuperAdminPanelStyle';
import * as actions from '../../store/actions';
import {EditForm} from './EditForm';

const SuperAdminPanel = props => {
    const [showData, setShowData] = useState(false);
    const [form, setForm] = useState(false);
    const [showEditForm , setShowEditForm] = useState(false);

    const [formElements, setFromElements] = useState([
        {
            type: 'text',
            placeholder: 'Enter username',
            value: ""
        },
        {
            type: 'password',
            placeholder: 'Enter password',
            value: ""
        }
    ])

    


    const dispatch = useDispatch()
    const onLogout = (token) => dispatch(actions.logoutSuperAdmin(token));
    const { token, data, loading, error, dataType } = props;

    if (token == null) {
        return <Redirect to="/login/superadmin" />
    }

    const handleLogout = (event) => {
        onLogout(token);
    }

       
    const inputChangeHandler = (event, index) => {
        console.log("hiiii");
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };
        updatedEl.value = event.target.value;
        updatedForm[index] = updatedEl;
        setFromElements(updatedForm);
    }
    const addUserAdminSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {
            studentNumber: formElements[0].value,
            password: formElements[1].value
        }
        const adminData = {
            username: formElements[0].value,
            password: formElements[1].value
        }
        if(dataType == 'user')
            dispatch(actions.addUser(token,userData));
        else if(dataType == 'QAdmin')
            dispatch(actions.addQAdmin(token,adminData));
        setFromElements([
            {
                type: 'text',
                placeholder: 'Enter username',
                value: ""
            },
            {
                type: 'password',
                placeholder: 'Enter password',
                value: ""
            }
        ])
        setForm(false);
    }

    const onDeleteClick = (el) => {
        if(dataType === 'user')
            dispatch(actions.deleteUser(token,el.studentNumber));
        else if(dataType=== 'QAdmin')
            dispatch(actions.deleteQAdmin(token,el.username));

    }

    const onEditClick = (el) => {
        setShowEditForm(true);
        // const userData = {
        //     studentNumber: editElements[0].value,
        //     password: editElements[1].value
        // }
        // const adminData = {
        //     username: editElements[0].value,
        //     password: editElements[1].value
        // }
        if(dataType==='user'){

        }
        else if(dataType==='QAdmin'){

        }
    }
    

    let dataList = null;
    let btn = null
    let formm = 
    <div style={{ flex: 1, height: '50px', marginBottom: '10px' }}>
        <Form onSubmit={addUserAdminSubmitHandler}>
            <Row>
                {formElements.map((element, index) => (
                <Col key={index}>
                    <Form.Control
                        type={element.type}
                        placeholder={element.placeholder}
                        value={element.value}
                        onChange={(event) => {inputChangeHandler(event, index)}}
                r       equired></Form.Control>
                </Col>
                ))}
            <Button variant="primary" type="submit" >
                {loading ? <Spinner animation="border" style={{ height: '23px', width: '20px' }} /> : 'Submit'}
            </Button>
            </Row>
        </Form>
    </div>

    let editForm = 
    <div style={{ flex: 1, height: '50px', marginBottom: '10px' }}>
        <Form onSubmit={addUserAdminSubmitHandler}>
            <Row>
                {formElements.map((element, index) => (
                <Col key={index}>
                    <Form.Control
                        type={element.type}
                        placeholder={element.placeholder}
                        value={element.value}
                        onChange={(event) => {inputChangeHandler(event, index)}}
                r       equired></Form.Control>
                </Col>
                ))}
            <Button variant="primary" type="submit" >
                {loading ? <Spinner animation="border" style={{ height: '23px', width: '20px' }} /> : 'Edit'}
            </Button>
            </Row>
        </Form>
    </div>
    
    
    
    const onAddClick = (event) => {
        setForm(!form);
        if(!form)
            setFromElements([
                {
                    type: 'text',
                    placeholder: 'Enter username',
                    value: ""
                },
                {
                    type: 'password',
                    placeholder: 'Enter password',
                    value: ""
                }
            ])
    }


    if (loading) {
        dataList = <Spinner animation="border" />;
    } else if (data != null) {
        btn = <div style={{ flex: 1, height: '60px' }}>
            <Button onClick={onAddClick} style={{ width: '100%' }}>+</Button>
            
        </div>
        
        dataList = data.map(el => (

            <Card key={el._id} style={{ flex: 1, height: '60px', padding: '15px', marginBottom: '10px' }}>
                <span style={{display:'flex' , justifyContent: 'space-between'}}>
                    {dataType === 'user' ? el.studentNumber : dataType === 'QAdmin' ? el.username : null}
                    <div>
                        <Button style={{marginRight:'10px' , marginBottom:'5px' , right:'0px', backgroundColor:'red' ,borderColor:'white'}}
                            onClick= {()=>{onDeleteClick(el)}}
                      >
                            <FaTrashAlt />
                        </Button>
                        <Button style={{marginRight:'10px' , marginBottom:'5px' , right:'0px', backgroundColor:'#eb9834' ,borderColor:'white'}}
                            onClick= {()=>{onEditClick(el)}}
                      >
                            <FaEdit />
                        </Button>
                    </div>
                    
                        
                </span>
                {/* <div>
                   
                    
                </div> */}
                

            </Card>
        ))
    }
    if (error != null) {
        dataList = <Alert variant={'danger'}> {error.message} </Alert>
    }
    return (
        <>
            <Modal
                size="lg"
                show={showData}
                onHide={() => setShowData(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {dataType === 'user' ? 'Users' : dataType === 'QAdmin' ? 'Question Admins' : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {btn}
                    {form ? formm : null}
                    {showEditForm ? editForm : null}
                    {dataList}
                </Modal.Body>
            </Modal>
            <Container>
                <Navbar fixed="top" style={{ width: '100%' }}  >
                    <Button
                        onClick={handleLogout}
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        variant="outline-primary">Log Out</Button>
                </Navbar>

                <MainButton onClick={() => { setShowData(!showData); dispatch(actions.getQAdmins(token)) }}> Question Admins </MainButton>
                <MainButton onClick={() => { setShowData(!showData); dispatch(actions.getUsers(token)) }}> Users </MainButton>
                <MainButton> Questions  </MainButton>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.superAdminAuth.token,
    data: state.userAdminCRUD.data,
    dataType: state.userAdminCRUD.dataType,
    loading: state.userAdminCRUD.loading,
    error: state.userAdminCRUD.error,
})

export default connect(mapStateToProps)(SuperAdminPanel);