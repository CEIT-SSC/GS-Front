import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import {FaHourglassStart} from 'react-icons/fa';
import download from 'downloadjs';

import * as actions from '../../store/actions';
import {
    Container, QTableContainer, QTableTitle, QTableEl, State,
    SQContainer, SQTitle, SQBody, SQExample, SQHeader, SubmitTitle,
    Button as LinkButton, ButtonContainer
} from './GUIQuestionsStyle';

const GUIQuestions = ({ questions, qClickHandler, selectedQIndex,
    loading, error, success, token, testCase,
    testCaseSuccess, testCaseError }) => {

    const [code, setCode] = useState(null);
    const [output, setOutput] = useState(null);
    //these two are used to show error and success alerts only for the related question not all of them.
    const [showError, setShowError] = useState(true);
    const [showSuccess, setShowSuccess] = useState(true);

    const dispatch = useDispatch();
    let selectedQuestion=null ; 
    if(selectedQIndex>=0 && selectedQIndex<questions.length) selectedQuestion=questions[selectedQIndex];
    console.log(selectedQIndex);
    console.log(selectedQuestion);

    useEffect(() => {
        dispatch(actions.getTestCase(selectedQuestion._id, selectedQuestion.name, token));
    }, [selectedQIndex])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('questionID', selectedQuestion._id);
        data.append('output', output);
        data.append('code', code);
        if (output.name.split('.')[1] !== 'txt') {
            alert('upload a text file as your output!');
        } else {
            dispatch(actions.uploadFile(data, token));
        }
        setShowError(true);
        setShowSuccess(true);
    }

    const dlTestcaseHandler = (event) => {
        event.preventDefault();
        download(testCase, selectedQuestion.name + "tescase.txt", "text/text");
    }

    const clickHandler = (index) => {
        setShowError(false);
        setShowSuccess(false);
        qClickHandler(index);
    }


    return (
        <Container>
            <Row>
                <Col md={4}>
                    <QTableContainer>
                        <QTableTitle>سوالات</QTableTitle>
                        {questions.length===0 ? <div 
                        style={{direction:'rtl', paddingRight:'2px'}}>هنوز سوالی تعریف نشده</div>:
                        questions.map((q, index) => (
                            <QTableEl key={q._id}
                                onClick={() => { clickHandler(index) }}
                                active={index === selectedQIndex}>
                                <div>{q.name}</div>
                                <State state={q.state} />
                            </QTableEl>
                        ))}
                        <ButtonContainer>
                            <LinkButton to="/scoreboard">جدول امتیازها</LinkButton>
                        </ButtonContainer>
                    </QTableContainer>

                </Col>
                <Col md={8}>
                    {selectedQuestion===null ?  <div style={{width:'100%' , fontSize:'300px',heigh:'100%',alignItems:'center',
                justifyContent:'center',display:'flex' , color:'#80808045',paddingTop:'50%',paddingBottom:'10%'}}>
                        <FaHourglassStart></FaHourglassStart>
                    </div>:<SQContainer>
                        <SQTitle>{selectedQuestion.name}</SQTitle>
                        <SQBody>{selectedQuestion.body}</SQBody>
                        {selectedQuestion.examples.map((el, index) => (
                            <div key={index}>
                                <SQHeader>ورودی {index + 1}</SQHeader>
                                <SQExample>{el.input}</SQExample>
                                <SQHeader>خروجی {index + 1}</SQHeader>
                                <SQExample>{el.output}</SQExample>
                            </div>
                        ))}
                        {testCaseSuccess ? <Button onClick={(event) => { dlTestcaseHandler(event) }}
                            style={{ marginTop: '10px', width: '100%' }}
                        >
                            تست کیس منحصر به خود را دانلود کنید
                        </Button>
                            : testCaseError ?
                                <Alert variant="danger">{testCaseError}</Alert>
                                : null}
                        <SubmitTitle>ارسال پاسخ</SubmitTitle>
                        {(success && showSuccess) && <Alert variant="success">Question submitted successfully</Alert>}
                        {(error && showError) && <Alert variant="danger">{error}</Alert>}
                        <Form style={{ direction: 'rtl', textAlign: 'right' }}
                            onSubmit={onSubmitHandler}
                        >
                            <Form.Group as={Row}>
                                <Form.Label as={Col} xs={3}>فایل کد</Form.Label>
                                <Form.File as={Col} xs={9}
                                    onChange={(event) => setCode(event.target.files[0])}
                                    required />
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label as={Col} xs={3}>فایل خروجی</Form.Label>
                                <Form.File as={Col} xs={9} accept=".txt"
                                    onChange={(event) => setOutput(event.target.files[0])}
                                    required />
                            </Form.Group>
                            <Button variant="warning" type="submit" style={{ width: '150px', fontWeight: 'bold', color: '#333' }}>
                                {loading ? <Spinner animation="border" style={{ height: '23px', width: '23px' }} /> : 'ارسال پاسخ'}
                            </Button>
                        </Form>
                    </SQContainer>}
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    loading: state.fileUploader.loading,
    error: state.fileUploader.error,
    success: state.fileUploader.success,
    token: state.userAuth.token,
    testCase: state.getTestCase.testCase,
    testCaseLoading: state.getTestCase.loading,
    testCaseSuccess: state.getTestCase.success,
    testCaseError: state.getTestCase.error,

})

export default connect(mapStateToProps)(GUIQuestions);