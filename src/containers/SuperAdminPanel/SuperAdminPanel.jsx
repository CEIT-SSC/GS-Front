import React from 'react';
import { Navbar, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Container, MainButton } from './SuperAdminPanelStyle';
import * as actions from '../../store/actions';

const SuperAdminPanel = props => {

    const dispatch = useDispatch()
    const onLogout = (token, adminType) => dispatch(actions.logoutSuperAdmin(token, adminType));
    const { token, theme } = props;
 
    const handleLogout = (event) => {
        onLogout(token, 'Super Admin');
    }

    if(token == null){
        return <Redirect to="/login/admin" />
    }

    return (
        <>
            <Container isdark={theme==='DARK'}>
                <Navbar fixed="top" style={{ width: '100%' }}  >
                    <Button
                        onClick={handleLogout}
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        variant="outline-danger">Log Out</Button>
                </Navbar>

                <MainButton isdark={theme==='DARK'} to="/list/superadmin/QAdmin"> Question Admins </MainButton>
                <MainButton isdark={theme==='DARK'} to="/list/superadmin/user"> Users </MainButton>
                <MainButton isdark={theme==='DARK'} to="/list/questions"> Questions  </MainButton>
                
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    theme: state.theme
})

export default connect(mapStateToProps)(SuperAdminPanel);