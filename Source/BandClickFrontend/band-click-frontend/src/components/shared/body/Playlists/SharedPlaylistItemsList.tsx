import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const SharedPlaylistItemsList = () => {
    return (
    <>
    <Container>
        <h3 className="text-start">Zawartość playlisty:</h3>
        <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Pozycja 1</div>
                    4/4 120 Bpm
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Pozycja 2</div>
                    4/4 90 Bpm
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">Pozycja 3</div>
                    8/8 150 Bpm
                </div>
            </ListGroup.Item>
        </ListGroup>
    </Container>
    </>
    );
}

export default SharedPlaylistItemsList;
