import React from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

const ItemTypeFilter = () => {
    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="3">
            Rodzaj pozycji
        </Form.Label>
        <Col sm="9">
            <Form.Select id={'type-select'} aria-label="Rodzaj" onChange={e => {
            }}>
                <option>Wszystkie</option>
                <option>Ustawienia metronomu</option>
                <option>Playlisty</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default ItemTypeFilter;
