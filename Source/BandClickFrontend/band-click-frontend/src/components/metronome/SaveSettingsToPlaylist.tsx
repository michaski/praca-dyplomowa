import { settings } from "cluster";
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
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
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const metronomeSettings = useSelector(metronomeSettingsSelector.getSettings);
    const metronomeSettingsActions = useAction(MetronomeSettingsStoreSerivce);
    const selectedPlaylist = useSelector(playlistSelector.getSelectedPlaylist);
    const playlistActions = useAction(PlaylistStoreService);

    useEffect(() => {
        MetronomeSettingsService.getTypes()
            .then(types => {
                setSettingsTypes(types);
                setSelectedTypeId(types[0].id);
            });
    }, []);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const addSettingsToPlaylist = () => {
        metronomeSettingsActions.setName(settingsName);
        metronomeSettingsActions.setType(settingsTypes.find(t => t.id === selectedTypeId) || settingsTypes[0]);
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
            typeId: selectedTypeId
        }).then(createdSetting => {
            console.log(`Adding ${createdSetting.name} to ${selectedPlaylist.name}`)
            let modifiedPlaylist = selectedPlaylist;
            modifiedPlaylist.metronomeSettings.push(createdSetting);
            playlistActions.editPlaylist(modifiedPlaylist);
            onSettingsAdded();
        });
        handleClose();
    }

    const selectedTypeChanged = (id: string) => {
        setSelectedTypeId(id);
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Zapisz &gt;&gt;
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Podaj nazwę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormControl type="text" placeholder="Nazwa..." onChange={e => {
                            setSettingsName(e.target.value);
                        }} />
                        <Form.Label htmlFor="type-select">Typ:</Form.Label>
                        <Form.Select id={'type-select'} aria-label="Rodzaj">
                            {
                                settingsTypes.map((type, index) => {
                                    return <option key={index} value={type.id} onChange={e => {
                                        selectedTypeChanged(e.currentTarget.value);
                                    }}>{type.name}</option>
                                })
                            }
                        </Form.Select>
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