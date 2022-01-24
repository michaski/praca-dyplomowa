import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import PlaylistService from "../../services/playlists/playlistService";

interface AddPlaylistProps {
    onPlaylistCreated: Function
}

const AddPlaylist: React.FC<AddPlaylistProps> = ({onPlaylistCreated}) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        PlaylistService.create({
            name: name
        }).then(result => {
            onPlaylistCreated(result);
        });
        setShowModal(false);
    }

    return (
    <>
    <Button variant="success" onClick={() => {setShowModal(true);}}>
        <FontAwesomeIcon icon={faPlus} />
    </Button>
    <Modal
        show={showModal}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Nowa playlista
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Form.Control type="text" placeholder="Nazwa..." onChange={e => {
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

export default AddPlaylist;
