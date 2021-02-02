import React , { useState}from 'react';
import { useDispatch, connect } from 'react-redux';
import {Table, Row, Col,Button} from 'react-bootstrap';
import {MainContainer , ListContainer} from './ScoreBoardStyle';

import * as actions from '../../store/actions';


const ScoreBoard = (props) => {

    const dispatch=useDispatch();
    const [show99,setShow99] =useState(false);
    const {scores , username} = props;
    let dataList=null;
    
    const changeScoresHandler= (event) => {
        const show=!show99;
        setShow99(show);
        
    }

    if(scores === null){
        dispatch(actions.getScoreBoard());
    }
    else{
        if(show99)
        dataList= scores.newbies.map((el, index) => (
            <tr style={{backgroundColor: (username!==null && username===el.studentNumber) ? 'yellow' : 'white'}}>
                <th>{index+1}</th>
                <th>{el.studentNumber}</th>
                <th>{el.penalty}</th>
                <th>{el.score}</th>
            </tr>
        ))
        else
        dataList= scores.notNoob.map((el, index) => (
            <tr style={{backgroundColor: (username!==null && username===el.studentNumber) ? 'yellow' : 'white'}}>
                <th>{index+1}</th>
                <th>{el.studentNumber}</th>
                <th>{el.penalty}</th>
                <th>{el.score}</th>
            </tr>
        ))
    }

    return (
        <MainContainer> 
            <Row>
                <Col>
                    <ListContainer>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>    
                            <h1> ScoreBoard</h1>
                            <Button onClick={(event)=>changeScoresHandler(event)}>
                                {show99 ? 'Elders:)':'Youngers:)'}
                            </Button> 
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
    )
}

const mapStateToProps = (state) => {
    return{
        scores: state.getScoreBoard.scores,
        username : state.userAuth.username
    }
}


export default connect(mapStateToProps)(ScoreBoard);