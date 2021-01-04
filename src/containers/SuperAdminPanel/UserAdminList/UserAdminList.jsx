import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { withRouter, Redirect } from 'react-router-dom';
import { Container, ListContainer, Button, AddNewBtn, TableEl, Header } from './UserAdminListStyle';
import * as actions from '../../../store/actions';
import EditForm from '../../../components/EditForm';


const UserAdminList = (props) => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const { token, data, loading, error, dataType } = props;

    useEffect(() => {
        const type = props.match.params.dataType;
        type === 'QAdmin' ? dispatch(actions.getQAdmins(token)) : dispatch(actions.getUsers(token));
    }, [dispatch, token, props.match.params.dataType]);

    const onAddClick = (event) => {
        setShowForm(true);
    }

    const onEditClick = (event, user) => {
        setUserToEdit(user);
        setShowForm(true);
    }
    const onDeleteClick = (event, el) => {
        if (window.confirm("Are you sure you want to delete?")) {
            if (dataType === 'user')
                dispatch(actions.deleteUser(token, el.studentNumber));
            else if (dataType === 'QAdmin')
                dispatch(actions.deleteQAdmin(token, el.username));
        }
    }


    let dataList = null;
    if (data != null) {
        dataList = data.map((el, index) => (
            <TableEl key={index}>
                <span>
                    {dataType === 'user' ? el.studentNumber : dataType === 'QAdmin' ? el.username : null}
                </span>
                <div style={{ display: 'flex' }}>
                    <Button color="red" onClick={(event) => onDeleteClick(event, el)}>
                        <FaTrashAlt />
                    </Button>
                    <Button color="#eb9834" onClick={(event) => onEditClick(event, el)}>
                        <FaEdit />
                    </Button>
                </div>
            </TableEl>
        ))
    }

    if (token === null) {
        return <Redirect to="/login/admin" />
    }

    return (
        <>
            <Modal
                show={showForm}
                onHide={() => { setShowForm(false); setUserToEdit(null); }}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {userToEdit === null ? dataType === 'user' ? 'Add User' : dataType === 'QAdmin' ? 'Add Question Admin' : '' : 'Edit'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                    <EditForm onSuccess={() => setShowForm(false)} userToEdit={userToEdit} ></EditForm>
                </Modal.Body> 

            </Modal>

            <Container>
                <Row>
                    <Col>
                        <ListContainer>
                            <Header>
                                <h1>
                                    {dataType === 'user' ? 'Users' : dataType === 'QAdmin' ? 'Question Admins' : ''}
                                </h1>
                                <AddNewBtn color="#2da829" style={{ fontWeight: 'bold' }} onClick={onAddClick}>Add New </AddNewBtn>
                            </Header>
                            {error && <Alert variant="danger">{error.message}</Alert>}
                            {loading ? <Spinner animation="border" /> : null}
                            {dataList}
                        </ListContainer>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    data: state.userAdminCRUD.data,
    dataType: state.userAdminCRUD.dataType,
    loading: state.userAdminCRUD.loading,
    error: state.userAdminCRUD.error,
})

export default connect(mapStateToProps)(withRouter(UserAdminList));