import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useAction } from "../../../../hooks/useAction";
import { MetronomeSettings } from "../../../../models/MetronomeSettings/MetronomeSettings";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import { MetronomeSettingsStoreSerivce } from "../../../../services/metronomeSettings/metronomeSettingsStoreService";
import authSelector from "../../../../store/selectors/auth.selector";
import "../sharedItem.css";

interface SharedMetronomeSettingsItemProps {
    metronomeSettings: MetronomeSettings,
    onItemDeleted: Function
}

const SharedMetronomeSettingsItem: React.FC<SharedMetronomeSettingsItemProps> = ({metronomeSettings, onItemDeleted}) => {
    const history = useHistory();
    const metronomeSettingsStoreActions = useAction(MetronomeSettingsStoreSerivce);
    const user = useSelector(authSelector.getUser);
    
    const loadMetronomeSettings = () => {
        metronomeSettingsStoreActions.loadSettings(metronomeSettings);
        history.push('/app');
    }

    const deleteItem = () => {
        MetronomeSettingsService.removeFromSharedInApp(metronomeSettings.id)
        .then(_ => {
            onItemDeleted();
        });
    }

    return (
    <>
    <ListGroup.Item className="shared-item">
        <Row>
            <Col sm="9" className="pt-1">
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
            <Col sm="3" className="d-flex align-items-center justify-content-end">
                <ButtonGroup size="sm">
                    <Button className="me-2" variant="secondary" onClick={() => {history.push(`/shared/metronomeSettings/${metronomeSettings.id}`);}}>Szczegóły</Button>
                    <Button onClick={loadMetronomeSettings}>Wczytaj</Button>
                    {
                        user && user.systemRole === 'Admin' &&
                        <Button className="mx-2" variant="danger" onClick={deleteItem}>Usuń</Button>
                    }
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    );
}

export default SharedMetronomeSettingsItem;
