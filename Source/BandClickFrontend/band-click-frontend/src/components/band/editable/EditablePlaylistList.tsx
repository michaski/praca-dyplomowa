import React from "react";
import { Accordion, Button, ButtonGroup, Container, ListGroup, Row } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { Playlist } from "../../../models/Playlists/Playlist";
import AddPlaylistToBand from "./AddPlaylistToBand";
import PlaylistActionButtons from "./PlaylistActionButtons";

interface EditablePlaylistListProps {
    playlists: Playlist[], 
    band: Band,
    handleBandInfoChanged: Function,
    onPlaylistLoad: Function
}

const EditablePlaylistList: React.FC<EditablePlaylistListProps> = ({playlists, band, handleBandInfoChanged, onPlaylistLoad}) =>{

    return (
        <>
            <Container>
                {
                    !playlists || playlists.length === 0 &&
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
                                <PlaylistActionButtons 
                                    band={band}
                                    playlist={playlist}
                                    onPlaylistLoad={onPlaylistLoad}
                                    onPlaylistDeleted={handleBandInfoChanged} />
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup as="ol" numbered className="text-start">
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
                <Row className="mt-3">
                    <AddPlaylistToBand band={band} onPlaylistAdded={handleBandInfoChanged} />
                </Row>
            </Container>
        </>
    );
}

export default EditablePlaylistList;
