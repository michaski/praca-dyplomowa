import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import BandService from "../../../services/bands/bandService";

interface RenameBandProps {
    band: Band
    onBandUpdated: Function
}

const RenameBand: React.FC<RenameBandProps> = ({band, onBandUpdated}) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(band.name);

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        BandService.update({
            id: band.id,
            name: name
        }).then(result => {
            onBandUpdated(result);
        });
        setShowModal(false);
    }
    
    return (
    <>
    <Button variant="warning" size="sm" onClick={openModal}>Zmień nazwę</Button>
    <Modal
        show={showModal}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Zmień nazwę
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Form.Control type="text" defaultValue={band.name} onChange={e => {
                    setName(e.target.value);
                }} />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-secondary" onClick={onHide}>Anuluj</Button>
            <Button className="btn btn-primary" onClick={onSave}>Zapisz</Button>
        </Modal.Footer>
    </Modal>
    </>
    );
}

export default RenameBand;
