import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Playlist } from "../../models/Playlists/Playlist";
import auth from "../../services/auth/auth";
import PlaylistService from "../../services/playlists/playlistService";
import authSelector from "../../store/selectors/auth.selector";
import playlistSelector from "../../store/selectors/playlist.selector";
import { PLAYLISTS_CONTROLLER } from "../../utils/apiUrls";
import http from "../../utils/requests/http";

interface EditPlaylistProps {
    playlist: Playlist,
    onPlaylistModified: Function,
    bandId?: string
}

const EditPlaylist: React.FC<EditPlaylistProps> = ({playlist, onPlaylistModified, bandId}) => {
    const [showModal, setShowModal] = useState(false);
    const [modifiedName, setModifiedName] = useState(playlist.name);
    const [isShared, setIsShared] = useState(playlist.isShared);
    const storeState = useSelector(playlistSelector.getSelectedPlaylist);
    const user = useSelector(authSelector.getUser);

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

    const onSave = async () => {
        let modifiedPlaylist = playlist;
        modifiedPlaylist.name = modifiedName;
        // modifiedPlaylist.isShared = isShared;
        if (!bandId) {
            PlaylistService.update({
                id: playlist.id,
                name: modifiedName
            })
            .then(_ => {
                if (isShared !== storeState.isShared) {
                    PlaylistService.shareInApp(playlist.id)
                    .then(_ => {
                        onPlaylistModified(modifiedPlaylist);
                    });
                } else {
                    onPlaylistModified(modifiedPlaylist);
                }
            });
        } else {
            await http.put(`${PLAYLISTS_CONTROLLER}/?bandId=${bandId}`, {
                id: playlist.id,
                name: modifiedName
            }, auth.getToken()).then(_ => {
                alert('Api call finished');
                if (isShared !== storeState.isShared && user.username === playlist.author) {
                    PlaylistService.shareInApp(playlist.id)
                    .then(_ => {
                        onPlaylistModified(modifiedPlaylist);
                    });
                } else {
                    onPlaylistModified(modifiedPlaylist);
                }
            });
        }
        setShowModal(false);
    }

    return (
    <>
    <Button className="mx-1" variant="warning" size="sm" onClick={openModal}>
        <FontAwesomeIcon icon={faPen} />
    </Button>
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
                {
                    user.username === playlist.author &&
                    <>
                    <h4 className="mt-4">Społecznościowe</h4>
                    <Form.Check type="switch" label="Udostępnij w aplikacji" defaultChecked={playlist.isShared} onChange={e => {
                        setIsShared(e.target.checked);
                    }} />
                    </>
                }
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
