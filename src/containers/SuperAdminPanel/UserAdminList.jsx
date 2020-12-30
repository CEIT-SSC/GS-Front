import React, { useState , useEffect } from 'react';
import { Navbar, Button, Modal, Spinner, Alert, Card , Form , Row, Col} from 'react-bootstrap';
import { Redirect , withRouter} from 'react-router-dom';
import { useDispatch, connect  } from 'react-redux';
import {confirmAlert} from 'react-confirm-alert';
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import { Container , ListContainer, DeleteButton, EditButton } from './SuperAdminPanelStyle';
import * as actions from '../../store/actions';
import EditForm from './EditForm';


const UserAdminList = (props) =>{
    const dispatch=useDispatch();
    const [showForm , setShowForm] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const { token, data, loading, error, dataType } = props;
    
    const handleBack = (event) =>{
        // console.log(props);
        props.history.replace("/panel/superadmin");
    }

    const onAddClick =(event) => {
        setShowForm(true);
    }

    const onEditClick =(event,user) =>{
        setUserToEdit(user);
        setShowForm(true);
    }
    const onDeleteClick = (event,el) => {
        if(dataType === 'user')
            dispatch(actions.deleteUser(token,el.studentNumber));
        else if(dataType=== 'QAdmin')
            dispatch(actions.deleteQAdmin(token,el.username));

    }


    let dataList=null;
    if(data !=null){
        dataList= data.map(el => (

            <Card key={el._id} style={{ flex: 1, height: '60px', padding: '15px', marginBottom: '10px' }}>
                <span style={{display:'flex' , justifyContent: 'space-between'}}>
                    {dataType === 'user' ? el.studentNumber : dataType === 'QAdmin' ? el.username : null}
                    <div>
                        <DeleteButton onClick = {(event) => onDeleteClick(event,el)}>
                            <FaTrashAlt />
                        </DeleteButton>
                        <EditButton onClick = {(event) => onEditClick(event,el)}>
                            <FaEdit />
                        </EditButton>
                    </div>
                    
                        
                </span>
    
            </Card>
        ))
    }
    
    if (token === null) {
        return <Redirect to="/login/superadmin" />
    }


    

    

    return (
        <>
        <Modal 
        size="sm"
        show={showForm}
        onHide={() => {setShowForm(false); setUserToEdit(null);}}
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {userToEdit===null ? dataType==='user' ? 'Add User' : dataType==='QAdmin' ? 'Add Question Admin' : '' : 'Edit'}
                    </Modal.Title>
            </Modal.Header>
            <EditForm userToEdit={userToEdit} ></EditForm>
        </Modal>
        
        <Container>
            <Navbar fixed="top" style={{ width: '100%' }}  >
                <Button
                    onClick={handleBack}
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                    variant="outline-primary">Back</Button>
            </Navbar>

            <ListContainer>
                <div style={{display:'flex' , justifyContent: 'space-between' , marginBotoom: '10px'}}>
                    <h1 >
                        {loading ? <Spinner animation="border" />:dataType === 'user' ? 'Users' : dataType === 'QAdmin' ? 'Question Admins' : ''}
                    </h1>
                    <Button style={{witdh:'100px'}} onClick={onAddClick}>+</Button>
                </div>
                {dataList}
            </ListContainer>
        </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.superAdminAuth.token,
    data: state.userAdminCRUD.data,
    dataType: state.userAdminCRUD.dataType,
    loading: state.userAdminCRUD.loading,
    error: state.userAdminCRUD.error,
})

export default connect(mapStateToProps)(withRouter(UserAdminList));