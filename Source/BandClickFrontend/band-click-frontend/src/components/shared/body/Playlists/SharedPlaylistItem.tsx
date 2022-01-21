import React from "react";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router";

const SharedPlaylistItem = () => {
    const history = useHistory();

    return (
    <>
    <ListGroup.Item className="shared-item">
        <Row>
            <Col sm="10">
                <h3>Nazwa playlisty</h3>
                <Row>
                    <ul className="item-info">
                        <li>Autor: XYZ</li>
                        <li>Data dodania: 20.01.2022</li>
                        <li><FontAwesomeIcon icon={faThumbsUp} /> 15</li>
                        <li><FontAwesomeIcon icon={faThumbsDown} /> 2</li>
                        <li>Komentarze: 4</li>
                    </ul>
                </Row>
            </Col>
            <Col sm="2" className="d-flex align-items-center">
                <ButtonGroup size="sm">
                    <Button variant="secondary" onClick={() => {history.push('/shared/playlist/1');}}>Szczegóły</Button>
                    <Button>Wczytaj</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    );
}

export default SharedPlaylistItem;
