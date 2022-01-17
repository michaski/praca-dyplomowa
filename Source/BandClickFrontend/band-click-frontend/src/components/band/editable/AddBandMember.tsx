import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddBandMember = () => {
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
    <Button variant="success" onClick={openModal}>Dodaj członka zespołu</Button>
    <Modal
        show={showModal}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Dodaj członka zespołu
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Form.Control type="email" placeholder="Email..." onChange={e => {
                    setName(e.target.value);
                }} />
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

export default AddBandMember;
