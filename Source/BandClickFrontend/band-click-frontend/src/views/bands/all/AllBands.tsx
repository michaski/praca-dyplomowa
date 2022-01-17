import React, { useState } from "react";
import { Button, Col, Container, Form, Nav, Offcanvas, Row, Tab } from "react-bootstrap";
import SimpleBand from "../../../components/band/simple/SimpleBand";
import LoggedInHeader from "../../../components/header/LoggedInHeader";

const AllBands = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
    <LoggedInHeader />
    <Container fluid>
        <Row>
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
        </Row>
        <Row>
            <Container>
                <SimpleBand />
            </Container>
        </Row>
    </Container>
    </>
    );
}

export default AllBands;
