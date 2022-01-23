import React from "react";
import { Accordion, Button, Container, ListGroup } from "react-bootstrap";
import { Playlist } from "../../../models/Playlists/Playlist";

interface SimplePlaylistListProps {
    playlists: Playlist[]
}

const SimplePlaylistList: React.FC<SimplePlaylistListProps> = ({playlists}) => {
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
                                <Button size="sm" className="ms-3">Wczytaj</Button>
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
            </Container>
        </>
    );
}

export default SimplePlaylistList;
