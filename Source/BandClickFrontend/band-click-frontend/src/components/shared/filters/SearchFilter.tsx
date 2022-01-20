import React from "react";
import { Col, Form, FormGroup, Row } from "react-bootstrap";

const SearchFilter = () => {
    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="2">
            Szukaj
        </Form.Label>
        <Col sm="10">
            <Form.Control className="col-md-8" type="text" placeholder="Szukaj..." onChange={e => {
                }} />
        </Col>
    </FormGroup>
    </>
    );
}

export default SearchFilter;
