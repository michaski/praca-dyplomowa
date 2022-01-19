import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Col, Row, Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAction } from "../../../hooks/useAction";
import { Band } from "../../../models/Bands/Band";
import { Playlist } from "../../../models/Playlists/Playlist";
import PlaylistService from "../../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../../services/playlists/playlistStoreService";
import playlistSelector from "../../../store/selectors/playlist.selector";

interface AddPlaylistToBandProps {
    band: Band,
    onPlaylistAdded: Function
}

const AddPlaylistToBand: React.FC<AddPlaylistToBandProps> = ({band, onPlaylistAdded}) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [createNew, setCreateNew] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState({} as Playlist);
    const userPlaylists = useSelector(playlistSelector.getAll);
    const playlistActions = useAction(PlaylistStoreService);

    useEffect(() => {
        if (!userPlaylists || userPlaylists.length === 0) {
            PlaylistService.getAll()
            .then(result => {
                playlistActions.addPlaylists(result);
            });
        }
        setSelectedPlaylist(userPlaylists[0]);
    }, []);

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        if (createNew) {
            PlaylistService.create({
                name: name
            }).then(result => {
                PlaylistService.shareInBand(result.id, band.id)
                .then(_ => {
                    onPlaylistAdded();
                });
            });
        } else {
            PlaylistService.shareInBand(selectedPlaylist.id, band.id)
            .then(_ => {
                onPlaylistAdded();
            });
        }
        setShowModal(false);
    }

    const handleTabSwitch = (key: string | null) => {
        if (!key) {
            return;
        }
        if (key === "select") {
            setCreateNew(false);
        } else if (key === "create") {
            setCreateNew(true);
        }
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
                <Tabs defaultActiveKey="select" id="uncontrolled-tab-example" className="mb-3" onSelect={handleTabSwitch}>
                    <Tab eventKey="select" title="Wybierz istniejącą">    
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Wybierz playlistę:
                            </Form.Label>
                            <Col sm="6">
                                <Form.Select onChange={e => {
                                    console.log(parseInt(e.target.value));
                                    setSelectedPlaylist(userPlaylists[parseInt(e.target.value)]);
                                }}>
                                {
                                    userPlaylists && userPlaylists.length > 0 &&
                                    userPlaylists.map((playlist, index) => {
                                        return <option key={index} value={index}>{playlist.name}</option>
                                    })
                                }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="create" title="Stwórz nową" >
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
