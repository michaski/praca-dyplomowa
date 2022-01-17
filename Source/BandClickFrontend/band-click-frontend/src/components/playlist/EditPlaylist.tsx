import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import { Playlist } from "../../models/Playlists/Playlist";
import PlaylistService from "../../services/playlists/playlistService";

interface EditPlaylistProps {
    playlist: Playlist,
    onPlaylistModified: Function
}

const EditPlaylist: React.FC<EditPlaylistProps> = ({playlist, onPlaylistModified}) => {
    const [showModal, setShowModal] = useState(false);
    const [modifiedName, setModifiedName] = useState(playlist.name);
    const [isShared, setIsShared] = useState(playlist.isShared);

    useEffect(() => {
        setModifiedName(playlist.name);
        setIsShared(playlist.isShared);
    }, [playlist]);

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        let modifiedPlaylist = playlist;
        modifiedPlaylist.name = modifiedName;
        modifiedPlaylist.isShared = isShared;
        PlaylistService.update({
            id: playlist.id,
            name: modifiedName
        })
        .then(_ => {
            if (isShared != playlist.isShared) {
                PlaylistService.shareInApp(playlist.id)
                .then(_ => {
                    onPlaylistModified(modifiedPlaylist);
                });
            } else {
                onPlaylistModified(modifiedPlaylist);
            }
        });
        setShowModal(false);
    }

    return (
    <>
    <Button variant="warning" size="sm" onClick={openModal}>&#9998;</Button>
    <Modal
        show={showModal}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edycja &mdash; {playlist.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Form.Label column sm="2">Nazwa</Form.Label>
                    <Form.Control type="text" defaultValue={playlist.name} onChange={e => {
                        setModifiedName(e.target.value);
                    }} />
                <h4>Społecznościowe</h4>
                <Form.Check type="switch" label="Udostępnij w aplikacji" defaultChecked={playlist.isShared} onChange={e => {
                    setIsShared(e.target.checked);
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

export default EditPlaylist;
