import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { QTableContainer, QTableTitle, QTableEl, State } from './GUIQuestionsStyle';

const GUIQuestions = ({ questions, qClickHandler, selectedQIndex }) => {
    const selectedQuestion = questions[selectedQIndex];
    return (
        <Container style={{ height: '100%', direction: 'rtl' }}>
            <Row>
                <Col md={4}>
                    <QTableContainer>
                        <QTableTitle>سوالات</QTableTitle>
                        {questions.map((q, index) => (
                            <QTableEl key={q._id}
                                onClick={() => qClickHandler(index)}
                                active={index === selectedQIndex}>
                                <div>{q.name}</div>
                                <State state={q.state} />
                            </QTableEl>
                        ))}
                    </QTableContainer>

                </Col>
                <Col md={8}>
                    {selectedQuestion.name}
                </Col>

            </Row>
        </Container>
    )
}

export default GUIQuestions;