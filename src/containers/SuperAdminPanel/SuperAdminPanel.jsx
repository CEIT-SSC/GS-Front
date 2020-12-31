import React from 'react';
import { Navbar, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Container, MainButton } from './SuperAdminPanelStyle';
import * as actions from '../../store/actions';

const SuperAdminPanel = props => {

    const dispatch = useDispatch()
    const onLogout = (token) => dispatch(actions.logoutSuperAdmin(token));
    const { token} = props;
 
    const handleLogout = (event) => {
        onLogout(token);
    }

    if(token == null){
        return <Redirect to="/login/superadmin" />
    }

    return (
        <>
            <Container>
                <Navbar fixed="top" style={{ width: '100%' }}  >
                    <Button
                        onClick={handleLogout}
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        variant="outline-primary">Log Out</Button>
                </Navbar>
                <MainButton to="/list/superadmin/QAdmin"> Question Admins </MainButton>
                <MainButton to="/list/superadmin/user"> Users </MainButton>
                <MainButton to="#"> Questions  </MainButton>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.superAdminAuth.token
})

export default connect(mapStateToProps)(SuperAdminPanel);