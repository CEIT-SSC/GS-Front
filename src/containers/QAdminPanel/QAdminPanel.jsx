import React from 'react';
import { Navbar, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Container, MainButton } from './QAdminPanelStyle';
import * as actions from '../../store/actions';

const QAdminPanel = props => {

    const dispatch = useDispatch()
    const onLogout = (token, adminType) => dispatch(actions.logoutSuperAdmin(token, adminType));
    const { token} = props;
 
    const handleLogout = (event) => {
        onLogout(token, 'Question Admin');
    }

    if(token == null){
        return <Redirect to="/login/admin" />
    }

    return (
        <>
            <Container>
                <Navbar fixed="top" style={{ width: '100%' }}  >
                    <Button
                        onClick={handleLogout}
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        variant="outline-danger">Log Out</Button>
                </Navbar>
                <MainButton to="/list/questions"> Questions  </MainButton>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token
})

export default connect(mapStateToProps)(QAdminPanel);