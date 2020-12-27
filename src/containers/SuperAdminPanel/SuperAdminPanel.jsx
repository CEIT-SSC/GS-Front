import React, { useState } from 'react';
import { Navbar, Button, Modal, Spinner, Alert, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Container, MainButton } from './SuperAdminPanelStyle';
import * as actions from '../../store/actions';

const SuperAdminPanel = props => {
    const [showData, setShowData] = useState(false);

    const dispatch = useDispatch()
    const onLogout = (token) => dispatch(actions.logoutSuperAdmin(token));
    const { token, data, loading, error, dataType } = props;

    if (token == null) {
        return <Redirect to="/login/superadmin" />
    }

    const handleLogout = (event) => {
        onLogout(token);
    }

    let dataa = null;
    let btn = null;

    if (loading) {
        dataa = <Spinner animation="border" />;
    } else if (data != null) {
        btn = <div style={{ flex: 1, height: '60px' }}>
            <Button style={{ width: '100%' }}>+</Button>
        </div>
        dataa = data.map(el => (
            <Card key={el._id} style={{ flex: 1, height: '60px', padding: '15px', marginBottom: '10px' }}>
                <span>
                    {dataType === 'user' ? el.studentNumber : dataType === 'QAdmin' ? el.username : null}
                </span>
            </Card>
        ))
    }
    if (error != null) {
        dataa = <Alert variant={'danger'}> {error.message} </Alert>
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
                    {dataa}
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