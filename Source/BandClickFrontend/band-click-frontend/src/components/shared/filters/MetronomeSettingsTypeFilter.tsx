import React from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

const MetronomeSettingsTypeFilter = () => {
    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="3">
            Typ ustawień
        </Form.Label>
        <Col sm="9">
            <Form.Select id={'type-select'} aria-label="Rodzaj" onChange={e => {
            }}>
                <option>Wszystkie</option>
                <option>Piosenki</option>
                <option>Ćwiczenia</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default MetronomeSettingsTypeFilter;
