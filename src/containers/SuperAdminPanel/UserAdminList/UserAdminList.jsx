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
    const { token, data, loading, error, dataType, theme } = props;

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
                style={{
                    filter: `invert(${theme === 'DARK' ? 0.9 : 0}) hue-rotate(${theme === 'DARK' ? '180deg' : '0deg'})`
                }}
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
            <div style={{
                width: '100%', height: '100%',
                backgroundColor: theme === 'DARK' ? '#0d1117' : '#2a5496'
            }}>
                <Container isdark={theme === 'DARK'}>
                    <Row>
                        <Col>
                            <ListContainer isdark={theme==='DARK'}>
                                <Header>
                                    <h1>
                                        {dataType === 'user' ? 'Users' : dataType === 'QAdmin' ? 'Question Admins' : ''}
                                    </h1>
                                    <AddNewBtn color="#2da829" style={{ fontWeight: 'bold' }} onClick={onAddClick}>Add New </AddNewBtn>
                                </Header>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {loading ? <Spinner animation="border" /> : null}
                                {dataList}
                            </ListContainer>
                        </Col>
                    </Row>

                </Container>
            </div>

        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    data: state.userAdminCRUD.data,
    dataType: state.userAdminCRUD.dataType,
    loading: state.userAdminCRUD.loading,
    error: state.userAdminCRUD.error,
    theme: state.theme
})

export default connect(mapStateToProps)(withRouter(UserAdminList));