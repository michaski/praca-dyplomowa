import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAction } from "../../../hooks/useAction";
import { Band } from "../../../models/Bands/Band";
import { Playlist } from "../../../models/Playlists/Playlist";
import BandService from "../../../services/bands/bandService";
import { PlaylistStoreService } from "../../../services/playlists/playlistStoreService";
import EditableMemberList from "./EditableMemberList";
import EditablePlaylistList from "./EditablePlaylistList";

interface EditableBandProps {
    band: Band
}

const EditableBand: React.FC<EditableBandProps> = ({band}) => {
    const [bandInfo, setBandInfo] = useState(band);
    const [hasNewPlaylist, setHasNewPlaylist] = useState(false);
    const playlistStoreActions = useAction(PlaylistStoreService);
    const history = useHistory();

    useEffect(() => {
        if (band.id || hasNewPlaylist) {
            BandService.getById(band.id)
            .then(bandDetails => {
                setBandInfo(bandDetails);
                setHasNewPlaylist(false);
            });
        }
    }, [band, hasNewPlaylist]);

    const handlePlaylistAdded = () => {
        setHasNewPlaylist(true);
    }

    const handlePlaylistDeleted = () => {
        setHasNewPlaylist(true);
    }

    const handlePlaylistLoaded = (playlist: Playlist) => {
        playlistStoreActions.setSelectedPlaylist(playlist);
        history.push('/app');
    }

    const handleBandMemberAdded = () => {
        setHasNewPlaylist(true);
    }

    return (
    <>
    <Container>
        <h1>{bandInfo && bandInfo.name}</h1>
        <Tabs defaultActiveKey="members" className="mb-3">
            <Tab eventKey="members" title="Członkowie">
                <EditableMemberList 
                    band={bandInfo} 
                    members={bandInfo && bandInfo.members}
                    onBandMemberAdded={handleBandMemberAdded} />
            </Tab>
            <Tab eventKey="playlists" title="Playlisty">
                <EditablePlaylistList 
                    playlists={bandInfo && bandInfo.playlists} 
                    band={bandInfo} 
                    onPlaylistAdded={handlePlaylistAdded}
                    onPlaylistDeleted={handlePlaylistDeleted}
                    onPlaylistLoad={handlePlaylistLoaded} />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default EditableBand;
