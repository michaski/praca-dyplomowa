import React, { useState } from "react";
import { Button, Form, Modal, Col, Row, Tabs, Tab } from "react-bootstrap";

const AddPlaylistToBand = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        // BandService.create({
        //     name: name
        // }).then(result => {
        //     onBandCreated(result);
        // });
        setShowModal(false);
    }
    
    return (
    <>
    <Button variant="success" onClick={openModal}>Dodaj playlistę</Button>
    <Modal
        show={showModal}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Dodaj playlistę do zespołu
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Tabs defaultActiveKey="select" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="select" title="Wybierz istniejącą">    
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Wybierz playlistę:
                            </Form.Label>
                            <Col sm="6">
                                <Form.Select>
                                    <option>Playlista 1</option>
                                    <option>Playlista 2</option>
                                    <option>Playlista 3</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="create" title="Stwórz nową">
                        <div className="container">
                            <Form.Control type="text" placeholder="Nazwa playlisty..." onChange={e => {
                                setName(e.target.value);
                            }} />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-secondary" onClick={onHide}>Anuluj</Button>
            <Button className="btn btn-primary" onClick={onSave}>Dodaj</Button>
        </Modal.Footer>
    </Modal>
    </>
    );
}

export default AddPlaylistToBand;
