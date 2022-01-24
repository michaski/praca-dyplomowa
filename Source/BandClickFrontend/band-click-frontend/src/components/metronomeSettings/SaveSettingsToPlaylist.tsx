import { settings } from "cluster";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormControl, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsType } from "../../models/MetronomeSettings/MetronomeSettingsType";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import MetronomeSettingsService from "../../services/metronomeSettings/metronomeSettingsService";
import metronomeSettingsSelector from "../../store/selectors/metronomeSettings.selector";
import playlistSelector from "../../store/selectors/playlist.selector";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";

interface SaveSettingsToPlaylistProps {
    onSettingsAdded: Function
}

const SaveSettingsToPlaylist: React.FC<SaveSettingsToPlaylistProps> = ({onSettingsAdded}) => {
    const [show, setShow] = useState(false);
    const [settingsName, setSettingsName] = useState('');
    const [settingsTypes, setSettingsTypes] = useState([] as MetronomeSettingsType[]);
    // const [selectedTypeId, setSelectedTypeId] = useState('');
    let selectedTypeId = useRef('');
    const metronomeSettings = useSelector(metronomeSettingsSelector.getSettings);
    const metronomeSettingsActions = useAction(MetronomeSettingsStoreSerivce);
    const selectedPlaylist = useSelector(playlistSelector.getSelectedPlaylist);
    const playlistActions = useAction(PlaylistStoreService);

    useEffect(() => {
        MetronomeSettingsService.getTypes()
            .then(types => {
                setSettingsTypes(types);
                selectedTypeId.current = types[0].id;
            });
    }, [selectedTypeId]);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const addSettingsToPlaylist = () => {
        if (!selectedPlaylist || !selectedPlaylist.id) {
            alert('Nie wybrano playlisty');
            handleClose();
            return;
        }
        metronomeSettingsActions.setName(settingsName);
        metronomeSettingsActions.setType(settingsTypes.find(t => t.id === selectedTypeId.current) || settingsTypes[0]);
        MetronomeSettingsService.create({
            name: settingsName,
            tempo: metronomeSettings.tempo,
            metre: {
                beatsPerBar: metronomeSettings.metre.beatsPerBar,
                rhythmicUnit: metronomeSettings.metre.rhythmicUnit,
                accentedBeats: metronomeSettings.metre.accentedBeats
            },
            numberOfMeasures: 4,
            playlistId: selectedPlaylist.id,
            typeId: selectedTypeId.current
        }).then(createdSetting => {
            let modifiedPlaylist = selectedPlaylist;
            modifiedPlaylist.metronomeSettings.push(createdSetting);
            playlistActions.editPlaylist(modifiedPlaylist);
            onSettingsAdded();
        });
        handleClose();
    }

    const selectedTypeChanged = (id: string) => {
        selectedTypeId.current = id;
        // setSelectedTypeId(id);
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Dodaj do playlisty
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Podaj nazwę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormControl id="settingName" type="text" placeholder="Nazwa..." onChange={e => {
                            setSettingsName(e.target.value);
                        }} />
                        <Row className="mt-3">
                            <Col md="1">
                                <Form.Label className="mt-2" htmlFor="type-select">Typ:</Form.Label>
                            </Col>
                            <Col md="11">
                                <Form.Select id={'type-select'} aria-label="Rodzaj" onChange={e => {
                                        selectedTypeChanged(e.currentTarget.value);
                                    }}>
                                {
                                    settingsTypes.map((type, index) => {
                                        return <option key={index} value={type.id}>{type.name}</option>
                                    })
                                }
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Anuluj
                </Button>
                <Button variant="primary" onClick={addSettingsToPlaylist}>
                    Zapisz
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SaveSettingsToPlaylist;
