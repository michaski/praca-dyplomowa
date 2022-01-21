import React from "react";
import { Accordion, Container, ListGroup } from "react-bootstrap";
import { MetronomeSettings } from "../../../../models/MetronomeSettings/MetronomeSettings";

interface SharedPlaylistItemsListProps {
    metronomeSettings: MetronomeSettings[]
}

const SharedPlaylistItemsList: React.FC<SharedPlaylistItemsListProps> = ({metronomeSettings}) => {

    return (
    <>
    {
        (!metronomeSettings || metronomeSettings.length === 0) &&
        <p className="fst-italic">Playlista jest pusta</p>
    }
    <Container>
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header><h3 className="text-start">Zawartość playlisty:</h3></Accordion.Header>
                <Accordion.Body>
                <ListGroup as="ol" numbered>
                    {
                        metronomeSettings.map((setting, index) => {
                            return (
                            <>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{setting.name}</div>
                                    {setting.metre.beatsPerBar}/{setting.metre.rhythmicUnit} {setting.tempo} Bpm
                                </div>
                            </ListGroup.Item>
                            </>
                            );
                        })
                    }
                </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </Container>
    </>
    );
}

export default SharedPlaylistItemsList;
