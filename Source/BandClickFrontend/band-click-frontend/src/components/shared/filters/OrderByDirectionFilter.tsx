import React from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

const OrderByDirectionFilter = () => {
    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="3">
            Kolejność sortowania
        </Form.Label>
        <Col sm="9">
            <Form.Select id={'type-select'} aria-label="Rodzaj" onChange={e => {
            }}>
                <option>Domyślnie</option>
                <option>Rosnąco</option>
                <option>Malejąco</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default OrderByDirectionFilter;
