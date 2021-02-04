import React, { useEffect } from 'react';
import { Spinner, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { withRouter, Redirect } from 'react-router-dom';
import { Container, ListContainer, Button, AddNewBtn, TableEl, Header } from './QuestionsStyle';
import * as actions from '../../store/actions';


const QAdminPanel = (props) => {
    const dispatch = useDispatch();
    const { token, data, loading, error } = props;

    useEffect(() => {
        dispatch(actions.getQuestions(token));
    }, [dispatch, token]);

    const onAddClick = (event) => {
        props.history.push('/question/create');
    }

    const onEditClick = (event, question) => {
        props.history.push({
            pathname: '/question/edit',
            state: { questionToEdit: question }
          });
    }
    const onDeleteClick = (event, el) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(actions.deleteQuestion(token, el._id));
        }
    }


    let dataList = null;
    if (data != null) {
        dataList = data.map((el, index) => (
            <TableEl key={index}>
                <span>
                    {el.name}
                    {"    "}
                    {el._id.toString().slice(-4)}
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
            <Container>
                <Row>
                    <Col>
                        <ListContainer>
                            <Header>
                                <h1>
                                    Questions
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
        </>
    );
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    data: state.questions.data,
    loading: state.questions.loading,
    error: state.questions.error,
})

export default connect(mapStateToProps)(withRouter(QAdminPanel));