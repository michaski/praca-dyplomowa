import React from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

const OrderByFilter = () => {
    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="3">
            Sortuj
        </Form.Label>
        <Col sm="9">
            <Form.Select id={'type-select'} aria-label="Rodzaj" onChange={e => {
            }}>
                <option>Brak sortowania</option>
                <option>Nazwa</option>
                <option>Autor</option>
                <option>Data</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default OrderByFilter;
