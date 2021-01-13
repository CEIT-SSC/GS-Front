import React, { useState } from 'react';
import { Form, Button, Spinner, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';


const CreateQuestion = (props) => {

    const dispatch = useDispatch();

    const [examples, setExamples] = useState([]);

    const { loading, token, success, error } = props;
  
    const [formElements, setFromElements] = useState([
        {
            type: 'datetime-local',
            label: 'For Date',
            placeholder: '',
            value: '',
            required: true
        },
        {
            type: 'text',
            label: 'Name',
            placeholder: 'Enter question name',
            value: '',
            required: true
        },
        {
            type: 'textarea',
            label: 'Body',
            placeholder: 'Enter question body',
            value: '',
            required: true
        },
        {
            type: 'number',
            label: 'Score',
            placeholder: 'Enter question score',
            value: '',
            required: true
        },
        {
            type: 'file',
            label: 'Test Generator',
            placeholder: 'select file',
            value: '',
            required: true
        },
        {
            type: 'file',
            label: 'Answer',
            placeholder: 'select file',
            value: '',
            required: true
        }
    ])

    const inputChangeHandler = (event, index) => {
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };

        //to get file inputs we need event.target.files but to update input
        //value we need event.target.value so to have them both I assigned event.target
        updatedEl.value = formElements[index].type === 'file' ? event.target : event.target.value;

        updatedForm[index] = updatedEl;
        setFromElements(updatedForm);
    }

    const exampleChangeHandler = (event, index, inputType) => {
        const updatedExamples = [...examples];
        const updatedEl = { ...examples[index] };
        updatedEl[inputType] = event.target.value;
        updatedExamples[index] = updatedEl;
        setExamples(updatedExamples);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('date', new Date(formElements[0].value).getTime());
        bodyFormData.append('name', formElements[1].value);
        bodyFormData.append('body', formElements[2].value);
        bodyFormData.append('score', formElements[3].value);
        bodyFormData.append('testGenerator', formElements[4].value.files[0]);
        bodyFormData.append('answer', formElements[5].value.files[0]);
        bodyFormData.append('examples', JSON.stringify(examples));
        dispatch(actions.addQuestion(token, bodyFormData));
    }
    if(success){
        return <Redirect to="/list/questions" />
    }
    return (
        <Container style={{ maxWidth: '700px', margin: '50px auto' }}>
            <Row>
                <Col>
                    <Card>
                        <Form style={{ padding: '20px' }}
                            onSubmit={onSubmitHandler}
                        >
                            {error && <Alert variant="danger">{error.message}</Alert>}
                            {formElements.map((element, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>{element.label}</Form.Label>
                                    <Form.Control
                                        type={element.type}
                                        as={element.type === 'textarea' ? 'textarea' : 'input'}
                                        label={element.label}
                                        placeholder={element.placeholder}
                                        value={element.type === 'file' ? element.value.value : element.value}
                                        onChange={(event) => inputChangeHandler(event, index)}
                                        required={element.required}></Form.Control>
                                </Form.Group>
                            ))}
                            <Form.Group>
                                {examples.map((element, index) => (
                                    <Form.Group key={index}>
                                    <Form.Label>{'example ' + (index + 1)}</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control
                                                    type={'text'}
                                                    placeholder={'input'}
                                                    as={'textarea'}
                                                    value={element.input}
                                                    onChange={(event) => exampleChangeHandler(event, index, 'input')}
                                                    required={true}></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    type={'text'}
                                                    placeholder={'ouput'}
                                                    as={'textarea'}
                                                    value={element.output}
                                                    onChange={(event) => exampleChangeHandler(event, index, 'output')}
                                                    required={true}></Form.Control>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                ))}
                                <Button variant="primary" onClick={() => { setExamples([...examples, { input: '', output: '' }]) }}>Add Example</Button>
                            </Form.Group>

                            <Button variant="primary" type="submit" block>
                                {loading ? <Spinner animation="border" /> : 'Submit'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>


    )
}

const mapStateToProps = (state) => ({
    token: state.adminAuth.token,
    loading: state.questions.loading,
    error: state.questions.createError,
    success: state.questions.createSuccess
})

export default connect(mapStateToProps)(CreateQuestion);