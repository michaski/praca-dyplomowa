import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddBand from "../../../components/band/editable/AddBand";
import EditableBand from "../../../components/band/editable/EditableBand";
import LoggedInHeader from "../../../components/header/LoggedInHeader";

const ManagedBands = () => {

    const handleBandCreated = (band: any) => {

    }

    return (
    <>
    <LoggedInHeader />
    <Container fluid>
        <Row>
            <Col md={10}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Wybierz zespół:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select size="lg">
                            <option>Zespół 1</option>
                            <option>Zespół 2</option>
                            <option>Zespół 3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Col>
            <Col md={2}>
                <AddBand onBandCreated={handleBandCreated} />
            </Col>
        </Row>
        <Row>
            <Container>
                <EditableBand />
            </Container>
        </Row>
    </Container>
    
    </>
    );
}

export default ManagedBands;
