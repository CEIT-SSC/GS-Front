import React, { useState } from 'react';
import { Form, Button, Spinner, Container, Card, Row, Col, Alert } from 'react-bootstrap';

const QuestionForm = (props) => {

    const {edit, loading, error, formValues, setFormValues, examples, setExamples, onSubmitHandler } = props;
    
    const [formElements] = useState([
        {
            type: 'datetime-local',
            label: 'For Date',
            placeholder: '',
            required: true
        },
        {
            type: 'text',
            label: 'Name',
            placeholder: 'Enter question name',
            required: true
        },
        {
            type: 'textarea',
            label: 'Body',
            placeholder: 'Enter question body',
            required: true
        },
        {
            type: 'number',
            label: 'Score',
            placeholder: 'Enter question score',
            required: true
        },
        {
            type: 'file',
            label: 'Test Generator',
            placeholder: 'select file',
            required: edit ? false : true
        },
        {
            type: 'file',
            label: 'Answer',
            placeholder: 'select file',
            required: edit ? false : true
        }
    ])

    const inputChangeHandler = (event, index) => {
        //to get file inputs we need event.target.files but to update input
        //value we need event.target.value so to have them both I assigned event.target
        const updatedFormValues = [...formValues];
        updatedFormValues[index] = formElements[index].type === 'file' ? event.target : event.target.value;
        setFormValues(updatedFormValues);
    }

    const exampleChangeHandler = (event, index, inputType) => {
        const updatedExamples = [...examples];
        const updatedEl = { ...examples[index] };
        updatedEl[inputType] = event.target.value;
        updatedExamples[index] = updatedEl;
        setExamples(updatedExamples);
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
                                        value={element.type === 'file' ? formValues[index].value : formValues[index]}
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


export default QuestionForm;