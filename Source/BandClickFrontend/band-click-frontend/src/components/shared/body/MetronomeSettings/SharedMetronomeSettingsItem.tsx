import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { MetronomeSettings } from "../../../../models/MetronomeSettings/MetronomeSettings";
import "../sharedItem.css";

interface SharedMetronomeSettingsItemProps {
    metronomeSettings: MetronomeSettings
}

const SharedMetronomeSettingsItem: React.FC<SharedMetronomeSettingsItemProps> = ({metronomeSettings}) => {
    const history = useHistory();
    
    return (
    <>
    <ListGroup.Item className="shared-item">
        <Row>
            <Col sm="10">
                <h3>{metronomeSettings.name}</h3>
                <Row>
                    <ul className="item-info">
                        <li>Autor: {metronomeSettings.author}</li>
                        <li>Data dodania: {new Date(metronomeSettings.created).toLocaleDateString()}</li>
                        <li><FontAwesomeIcon icon={faThumbsUp} /> {metronomeSettings.positiveRaitingCount}</li>
                        <li><FontAwesomeIcon icon={faThumbsDown} /> {metronomeSettings.negativeRaitingCount}</li>
                        <li>Komentarze: {metronomeSettings.commentsCount}</li>
                    </ul>
                </Row>
            </Col>
            <Col sm="2" className="d-flex align-items-center">
                <ButtonGroup size="sm">
                    <Button variant="secondary" onClick={() => {history.push(`/shared/metronomeSettings/${metronomeSettings.id}`);}}>Szczegóły</Button>
                    <Button>Wczytaj</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    );
}

export default SharedMetronomeSettingsItem;
