import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import BandService from "../../../services/bands/bandService";

interface AddBandMemberProps {
    band: Band,
    onBandMemberAdded: Function
}

const AddBandMember: React.FC<AddBandMemberProps> = ({band, onBandMemberAdded}) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        BandService.addMember({
            username: name,
            bandId: band.id
        }).then(result => {
            onBandMemberAdded();
        });
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
                <Form.Control type="text" placeholder="Nazwa użytkownika..." onChange={e => {
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
