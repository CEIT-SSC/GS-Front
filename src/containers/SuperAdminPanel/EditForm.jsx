import {Form, Row, Col,Button,Spinner} from 'react-bootstrap';


const EditForm = (props) => {
    return(
    <div style={{ flex: 1, height: '50px', marginBottom: '10px' }}>
        <Form onSubmit={props.onSubmit}>
            <Row>
                {props.formElements.map((element, index) => (
                <Col key={index}>
                    <Form.Control
                        type={element.type}
                        placeholder={element.placeholder}
                        value={element.value}
                        onChange={(event) => {props.inputChangeHandler(event, index)}}
                r       equired></Form.Control>
                </Col>
                ))}
            <Button variant="primary" type="submit" >
                {props.loading ? <Spinner animation="border" style={{ height: '23px', width: '20px' }} /> : 'Submit'}
            </Button>
            </Row>
        </Form>
    </div>
    )
}

export default EditForm;