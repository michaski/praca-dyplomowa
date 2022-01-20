import React from "react";
import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import "../sharedItem.css";

const SharedMetronomeSettingsItem = () => {
    return (
    <>
    <ListGroup.Item className="shared-item">
        <Row>
            <Col sm="10">
                <h3>Nazwa ustawienia</h3>
                <Row>
                    <ul className="item-info">
                        <li>Autor: XYZ</li>
                        <li>Data dodania: 20.01.2022</li>
                        <li>Up 15</li>
                        <li>Down 2</li>
                        <li>Komentarze: 4</li>
                    </ul>
                </Row>
            </Col>
            <Col sm="2" className="d-flex align-items-center">
                <ButtonGroup size="sm">
                    <Button variant="secondary">Szczegóły</Button>
                    <Button>Wczytaj</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    );
}

export default SharedMetronomeSettingsItem;
