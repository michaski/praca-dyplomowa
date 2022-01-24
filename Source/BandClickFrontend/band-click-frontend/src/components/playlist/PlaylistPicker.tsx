import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import { playlistAction } from "../../store/actions/playlists.actions";
import playlistSelector from "../../store/selectors/playlist.selector";
import AddPlaylist from "./AddPlaylist";
import EditPlaylist from "./EditPlaylist";
import PlaylistComponent from "./PlaylistComponent";

interface PlaylistPickerProps {
    forcePlaylistRefresh: boolean,
    onPlaylistRefreshed: Function,
    onSelectedPlaylistChange: Function,
    onSelectedSettingsChanged: Function,
    refreshPlaylist: Function,
    barCount: number,
    onAutoSwitchToggle: Function,
    bandId?: string,
    playlistId?: string
}

const PlaylistPicker: React.FC<PlaylistPickerProps> = ({
    forcePlaylistRefresh, onPlaylistRefreshed, onSelectedPlaylistChange, onSelectedSettingsChanged, refreshPlaylist, barCount, onAutoSwitchToggle, bandId, playlistId}) => {
    const [playlists, setPlaylists] = useState([] as Playlist[]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const playlistActions = useAction(PlaylistStoreService);
    const playlistsStore = useSelector(playlistSelector.getAll);
    const selectedPlaylist = useSelector(playlistSelector.getSelectedPlaylist);
    let playlistIndex = useRef(0);
        
    useEffect(() => {
        // if (playlistId) {
        //     fetchPlaylistInfo(playlistId);
        //     setSelectedPlaylistId(selectedPlaylist.id);
        //     playlistIndex.current = playlistsStore.indexOf(selectedPlaylist);
        //     onSelectedPlaylistChange(selectedPlaylist.id);
        //     return;
        // }
        if (playlists.length === 0) {
            getPlaylists();
        }
    }, []);

    const getPlaylists = () => {
        PlaylistService.getAll()
            .then(result => {
                if (selectedPlaylist.id) {
                    fetchPlaylistInfo(selectedPlaylist.id);
                    // setSelectedPlaylistId(selectedPlaylist.id);
                } 
                if(result && result.length > 0) {
                    setPlaylists(result);
                    playlistActions.addPlaylists(result);
                    if (!selectedPlaylist.id || selectedPlaylist.id === '') {
                        fetchPlaylistInfo(result[playlistIndex.current].id);
                    }
                    // setSelectedPlaylistId(result[playlistIndex.current].id);
                }
                if (playlistId) {
                    fetchPlaylistInfo(playlistId);
                    // setSelectedPlaylistId(playlistId);
                }
                playlistIndex.current = playlistsStore.indexOf(selectedPlaylist);
                onSelectedPlaylistChange(selectedPlaylist.id);
            });
        // if (!selectedPlaylist.id) {
        //     PlaylistService.getAll()
        //     .then(result => {
        //         if(result && result.length > 0) {
        //             setPlaylists(result);
        //             playlistActions.addPlaylists(result);
        //             fetchPlaylistInfo(result[playlistIndex.current].id);
        //             setSelectedPlaylistId(result[playlistIndex.current].id);
        //         }
        //     });
        // } else {
        //     fetchPlaylistInfo(selectedPlaylist.id);
        //     setSelectedPlaylistId(selectedPlaylist.id);
        //     playlistIndex.current = playlistsStore.indexOf(selectedPlaylist);
        //     onSelectedPlaylistChange(selectedPlaylist.id);
        // }
    }

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        onSelectedSettingsChanged(settings);
    }

    const fetchPlaylistInfo = (playlistId: string) => {
        PlaylistService.getById(playlistId)
            .then(playlistInfo => {
                if (playlistInfo && playlistInfo.id) {
                    if (playlistsStore.find(p => p.id === playlistInfo.id)) {
                        playlistActions.editPlaylist(playlistInfo);
                    } else {
                        playlistActions.addPlaylist(playlistInfo);
                    }
                    playlistActions.setSelectedPlaylist(playlistInfo);
                    setPlaylists(previous => {
                        let filtered = previous.filter(p => p.id !== playlistInfo.id);
                        filtered.push(playlistInfo);
                        return filtered;
                    });
                    setSelectedPlaylistId(playlistInfo.id);
                }
            });
    }

    const handleSelectedPlaylistChanged = (playlistId: string) => {
        setSelectedPlaylistId(playlistId);
        onSelectedPlaylistChange(playlistId);
        const playlistState = playlists.find(p => p.id === playlistId);
        if (playlistState) {
            playlistIndex.current = playlists.indexOf(playlistState);
        }
        const selectedPlaylistState = playlistsStore.find(p => p.id === playlistId) || playlistsStore[0];
        if (!selectedPlaylistState || !selectedPlaylistState.metronomeSettings) {
            fetchPlaylistInfo(playlistId);
        }
    }

    const handlePlaylistCreated = (newPlaylist: Playlist) => {
        playlistActions.addPlaylist(newPlaylist);
        getPlaylists();
    }

    const deletePlaylist = () => {
        PlaylistService.delete(selectedPlaylistId)
        .then(response => {
            if (response !== null) {
                const deletedPlaylist = playlistsStore.find(p => p.id === selectedPlaylistId);
                if (deletedPlaylist) {
                    playlistActions.deletePlaylist(deletedPlaylist);
                    setPlaylists(playlists.filter(p => p.id !== selectedPlaylistId));
                    playlistActions.setSelectedPlaylist(playlistsStore[0]);
                    setSelectedPlaylistId(playlists[0].id);
                    playlistIndex.current = 0;
                }
            }
        });
    }

    const handlePlaylistEdit = (modifiedPlaylist: Playlist) => {
        playlistActions.editPlaylist(modifiedPlaylist);
        handleSelectedPlaylistChanged(modifiedPlaylist.id);
        let unmodifiedPlaylists = playlists.filter(p => p.id !== modifiedPlaylist.id);
        unmodifiedPlaylists.push(selectedPlaylist);
        setPlaylists(unmodifiedPlaylists);
        playlistIndex.current = playlists.indexOf(selectedPlaylist);
        onSelectedSettingsChanged();
    }

    return (
        <Container className="mt-4">
            <h2>Playlista</h2>
            {
            playlists && playlists.length > 0 && selectedPlaylist && selectedPlaylist.id &&
            <>
            <Container className="d-flex justify-content-center border py-2">
                <Form.Select className="ms-3 me-2" name="playlists" id="playlist-select" value={selectedPlaylist.id} onChange={e => {
                    handleSelectedPlaylistChanged(e.target.value);
                }}>
                    {
                        playlists.map((playlist, index) => {
                            return <option key={index} value={playlist.id}>{playlist.name}</option>
                        })
                    }
                </Form.Select>
                <ButtonGroup size="sm">
                    <AddPlaylist onPlaylistCreated={handlePlaylistCreated} />
                    <EditPlaylist playlist={selectedPlaylist} onPlaylistModified={handlePlaylistEdit} bandId={bandId} />
                    <Button className="" variant="danger" onClick={deletePlaylist}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </ButtonGroup>
            </Container>
            <PlaylistComponent 
                id={selectedPlaylistId} 
                onSelectedSettingsChanged={handleSelectedSettingsChanged} 
                refreshPlaylist={forcePlaylistRefresh} 
                onPlaylistRefreshed={onPlaylistRefreshed}
                forceRefresh={refreshPlaylist}
                barsFinished={barCount}
                onAutoSwitchToggle={onAutoSwitchToggle}
                bandId={bandId}
            />
            </>
            }
            {
                (!playlists || playlists.length === 0) && selectedPlaylist && selectedPlaylist.id &&
                <>
                <Container className="d-flex justify-content-center border py-2">
                    <Form.Select className="ms-3 me-2" name="playlists" id="playlist-select" value={selectedPlaylist.id}>
                        <option value={selectedPlaylist.id}>{selectedPlaylist.name}</option>
                    </Form.Select>
                    <ButtonGroup size="sm">
                        <AddPlaylist onPlaylistCreated={handlePlaylistCreated} />
                        <EditPlaylist playlist={selectedPlaylist} onPlaylistModified={handlePlaylistEdit} bandId={bandId} />
                        <Button className="" variant="danger" onClick={deletePlaylist}>&#10006;</Button>
                    </ButtonGroup>
                </Container>
                <PlaylistComponent 
                    id={selectedPlaylistId} 
                    onSelectedSettingsChanged={handleSelectedSettingsChanged} 
                    refreshPlaylist={forcePlaylistRefresh} 
                    onPlaylistRefreshed={onPlaylistRefreshed}
                    forceRefresh={refreshPlaylist}
                    barsFinished={barCount}
                    onAutoSwitchToggle={onAutoSwitchToggle}
                    bandId={bandId}
                />
                </>
            }
            {
                (!playlists || playlists.length === 0) && (!selectedPlaylist || !selectedPlaylist.id) &&
                <>
                <p className="fst-italic">Brak playlist</p>
                <AddPlaylist onPlaylistCreated={handlePlaylistCreated} />
                </>
            }
        </Container>
    );
}

export default PlaylistPicker;
