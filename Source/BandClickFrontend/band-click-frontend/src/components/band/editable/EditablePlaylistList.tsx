import React from "react";
import { Accordion, Button, ButtonGroup, Container, ListGroup, Row } from "react-bootstrap";
import { Playlist } from "../../../models/Playlists/Playlist";
import AddPlaylistToBand from "./AddPlaylistToBand";

interface EditablePlaylistListProps {
    playlists: Playlist[]
}

const EditablePlaylistList: React.FC<EditablePlaylistListProps> = ({playlists}) =>{
    return (
        <>
            <Container>
                {
                    playlists && playlists.length === 0 &&
                    <p className="fst-italic">Brak playlist</p>
                }
                <Accordion>
                    {
                        playlists && playlists.length > 0 &&
                        playlists.map((playlist, parentIndex) => {
                            return (
                            <Accordion.Item key={parentIndex} eventKey={`${parentIndex}`}>
                            <Accordion.Header>
                                <span>{playlist.name}</span>
                                <ButtonGroup size="sm">
                                    <Button>Wczytaj</Button>
                                    <Button variant="danger">Usuń z zespołu</Button>
                                </ButtonGroup>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup as="ol" numbered>
                                    {
                                        playlists[parentIndex].metronomeSettings &&
                                        playlists[parentIndex].metronomeSettings.map((settings, childIndex) => {
                                            return (
                                            <ListGroup.Item
                                                key={`${parentIndex}.${childIndex}`}
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{settings && settings.name}</div>
                                                    {settings && settings.metre.beatsPerBar}/{settings && settings.metre.rhythmicUnit} {settings && settings.tempo} Bpm
                                                </div>
                                            </ListGroup.Item>
                                            );
                                        })
                                    }
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            );
                        })
                    }
                </Accordion>
                <Row>
                    <AddPlaylistToBand />
                </Row>
            </Container>
        </>
    );
}

export default EditablePlaylistList;
