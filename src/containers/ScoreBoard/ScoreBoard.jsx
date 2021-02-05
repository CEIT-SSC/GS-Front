import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import { MainContainer, ListContainer, BackLink } from './ScoreBoardStyle';

import * as actions from '../../store/actions';


const ScoreBoard = (props) => {

    const dispatch = useDispatch();
    const [show99, setShow99] = useState(false);
    const { scores, username, theme } = props;
    let dataList = null;

    if (scores === null) {
        dispatch(actions.getScoreBoard());
    }
    else {
        if (show99)
            dataList = scores.newbies.map((el, index) => (
                <tr style={{ backgroundColor: (username !== null && username === el.studentNumber) ? 'yellow' : 'white' }}>
                    <th>{index + 1}</th>
                    <th>{el.studentNumber}</th>
                    <th>{el.penalty}</th>
                    <th>{el.score}</th>
                </tr>
            ))
        else
            dataList = scores.notNoob.map((el, index) => (
                <tr style={{ backgroundColor: (username !== null && username === el.studentNumber) ? 'yellow' : 'white' }}>
                    <th>{index + 1}</th>
                    <th>{el.studentNumber}</th>
                    <th>{el.penalty}</th>
                    <th>{el.score}</th>
                </tr>
            ))
    }

    return (
        <div style={{
            width: '100%', height: '100%',
            backgroundColor: theme === 'DARK' ? '#0d1117' : '#2a5496'
        }}>
            <BackLink to="/">Back to Home</BackLink>
            <MainContainer>
                <Row>
                    <Col>
                        <ListContainer isdark={theme === 'DARK'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <h1> ScoreBoard</h1>
                                <Form.Control style={{width:'100px'}}
                                as="select" value={show99} onChange={() => setShow99(!show99)}>
                                    <option value={true}>99s</option>
                                    <option value={false}>others</option>
                                </Form.Control>
                            </div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>StudentNumber</th>
                                        <th>Penalty</th>
                                        <th>Score</th>
                                    </tr>
                                    {dataList}
                                </thead>
                            </Table>
                        </ListContainer>
                    </Col>
                </Row>
            </MainContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        scores: state.getScoreBoard.scores,
        username: state.userAuth.username,
        theme: state.theme
    }
}


export default connect(mapStateToProps)(ScoreBoard);