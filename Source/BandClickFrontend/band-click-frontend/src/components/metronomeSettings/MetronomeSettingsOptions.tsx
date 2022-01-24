import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, FormSelect, Modal, Row } from "react-bootstrap";
import AccentPicker from "../accentPicker/AccentPicker";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsType } from "../../models/MetronomeSettings/MetronomeSettingsType";
import MetronomeSettingsService from "../../services/metronomeSettings/metronomeSettingsService";
import { mapAccentMapToAccentedBeats } from "../../utils/metronomeSettings/mapAccents";
import { useSelector } from "react-redux";
import metronomeSettingsSelector from "../../store/selectors/metronomeSettings.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import http from "../../utils/requests/http";
import auth from "../../services/auth/auth";
import { METRONOME_SETTINGS_CONTROLLER } from "../../utils/apiUrls";
import authSelector from "../../store/selectors/auth.selector";

interface MetronomeSettingsOptionsProps {
    settings: MetronomeSettings,
    onSettingsChanged: Function,
    bandId?: string
}

const MetronomeSettingsOptions: React.FC<MetronomeSettingsOptionsProps> = ({settings, onSettingsChanged, bandId}) => {
    const [showModal, setShowModal] = useState(false);
    const [modifiedSettings, setModifiedSettings] = useState(settings);
    const [settingsTypes, setSettingsTypes] = useState([] as MetronomeSettingsType[]);
    const storeIsSharedState = useSelector(metronomeSettingsSelector.getIsShared);
    const user = useSelector(authSelector.getUser);

    useEffect(() => {
        setModifiedSettings(settings);
        MetronomeSettingsService.getTypes()
            .then(types => {
                setSettingsTypes(types);
            });
    }, [settings]);

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        let settingsStatus = modifiedSettings;
        if (!bandId) {
        MetronomeSettingsService.update({
            id: settingsStatus.id,
            name: settingsStatus.name,
            tempo: settingsStatus.tempo,
            numberOfMeasures: settingsStatus.numberOfMeasures,
            typeId: settingsStatus.type.id
        }, settingsStatus.metre) 
            .then(response => {
                if (response.metre !== null && response.metronomeSettings !== null) {
                    if (storeIsSharedState !== settingsStatus.isShared) {
                        MetronomeSettingsService.shareInApp(settingsStatus.id);
                    }
                }
            });
        } else {
            http.put(`${METRONOME_SETTINGS_CONTROLLER}/?bandId=${bandId}`, {
                id: settingsStatus.id,
                name: settingsStatus.name,
                tempo: settingsStatus.tempo,
                numberOfMeasures: settingsStatus.numberOfMeasures,
                typeId: settingsStatus.type.id
            }, auth.getToken()).then(_ => {
                if (storeIsSharedState !== settingsStatus.isShared && settingsStatus.author === user.username) {
                    MetronomeSettingsService.shareInApp(settingsStatus.id);
                }
            });
        }
        onSettingsChanged();
        setShowModal(false);
    }

    return (
        <>
        <Button className="me-1" variant="warning" size="sm" onClick={openModal}>
            <FontAwesomeIcon icon={faPen} />
        </Button>
        {
            settings.type &&
            <Modal
                show={showModal}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edycja &mdash; {settings.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <FormGroup>
                        <h4>Metronom</h4>
                        <FormGroup as={Row} className="mb-2">
                            <Form.Label column sm="2">Nazwa</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" defaultValue={settings.name} onChange={e => {
                                    let newSettings = modifiedSettings;
                                    newSettings.name = e.target.value;
                                    setModifiedSettings(newSettings);
                                }} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} className="mb-2">
                            <Form.Label column sm="2">Tempo</Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" defaultValue={settings.tempo} onChange={e => {
                                    let newSettings = modifiedSettings;
                                    newSettings.tempo = parseInt(e.target.value);
                                    setModifiedSettings(newSettings);
                                }} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} className="mb-2">
                            <Form.Label column sm="2">Liczba taktów</Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" defaultValue={settings.numberOfMeasures} onChange={e => {
                                    let newSettings = modifiedSettings;
                                    newSettings.numberOfMeasures = parseInt(e.target.value);
                                    setModifiedSettings(newSettings);
                                }} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} className="mb-2">
                            <Form.Label column sm="2">Rodzaj</Form.Label>
                            <Col sm="10">
                                <FormSelect defaultValue={settings.type.id} onChange={e => {
                                            let newSettings = modifiedSettings;
                                            newSettings.type = settingsTypes.find(t => t.id === e.currentTarget.value) || settingsTypes[0];
                                            setModifiedSettings(newSettings);
                                        }}>
                                    {
                                        settingsTypes.map((type, index) => {
                                            return <option key={index} value={type.id}>{type.name}</option>
                                        })
                                    }
                                </FormSelect>
                            </Col>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup as={Row} className="mt-4">
                        <h4>Metrum</h4>
                        <Form.Control className="mb-2" type="number" defaultValue={settings.metre.beatsPerBar} min={1} onChange={e => {
                            let newSettings = modifiedSettings;
                            modifiedSettings.metre.beatsPerBar = parseInt(e.target.value);
                            setModifiedSettings(newSettings);
                        }} />
                        <Form.Control type="number" defaultValue={settings.metre.rhythmicUnit} step={4} min={4} max={16} onChange={e => {
                            let newSettings = modifiedSettings;
                            modifiedSettings.metre.rhythmicUnit = parseInt(e.target.value);
                            setModifiedSettings(newSettings);
                        }} />
                        <h5 className="mt-4">Akcenty</h5>
                        <AccentPicker beatsPerBar={settings.metre.beatsPerBar} onAccentPatternChange={(accentMap: boolean[]) => {
                            let newSettings = modifiedSettings;
                            modifiedSettings.metre.accentedBeats = mapAccentMapToAccentedBeats(accentMap);
                            setModifiedSettings(newSettings);
                        }} />
                    </FormGroup>
                    <FormGroup as={Row} className="mt-4">
                        <h4>Społecznościowe</h4>
                        <Form.Check type="switch" label="Udostępnij w aplikacji" defaultChecked={settings.isShared} onChange={e => {
                            let newSettings = modifiedSettings;
                            modifiedSettings.isShared = e.target.checked;
                            setModifiedSettings(newSettings);
                        }} />
                    </FormGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={onHide}>Anuluj</Button>
                <Button className="btn btn-primary" onClick={onSave}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
        }
        </>
    );
}

export default MetronomeSettingsOptions;
