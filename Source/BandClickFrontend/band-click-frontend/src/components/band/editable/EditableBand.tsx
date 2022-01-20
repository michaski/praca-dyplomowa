import React, { useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAction } from "../../../hooks/useAction";
import { Band } from "../../../models/Bands/Band";
import { Playlist } from "../../../models/Playlists/Playlist";
import BandService from "../../../services/bands/bandService";
import { PlaylistStoreService } from "../../../services/playlists/playlistStoreService";
import BandActionButtons from "./BandActionButtons";
import EditableMemberList from "./EditableMemberList";
import EditablePlaylistList from "./EditablePlaylistList";
import RenameBand from "./RenameBand";

interface EditableBandProps {
    band: Band,
    onBandDeleted: Function
}

const EditableBand: React.FC<EditableBandProps> = ({band, onBandDeleted}) => {
    const [bandInfo, setBandInfo] = useState(band);
    const [bandStateChanged, setbandStateChanged] = useState(false);
    const playlistStoreActions = useAction(PlaylistStoreService);
    const history = useHistory();

    useEffect(() => {
        if ((band && band.id) || bandStateChanged) {
            BandService.getById(band.id)
            .then(bandDetails => {
                setBandInfo(bandDetails);
                setbandStateChanged(false);
            });
        } else {

        }
    }, [band, bandStateChanged]);

    const handlePlaylistLoaded = (playlist: Playlist) => {
        playlistStoreActions.setSelectedPlaylist(playlist);
        history.push('/app');
    }

    const handleBandInfoChanged = () => {
        setbandStateChanged(true);
    }

    return (
    <>
    <Container>
        <h1>{bandInfo && bandInfo.name}</h1>
        <BandActionButtons band={bandInfo} onBandUpdated={handleBandInfoChanged} onBandDeleted={onBandDeleted} />
        <Tabs defaultActiveKey="members" className="mb-3">
            <Tab eventKey="members" title="Członkowie">
                <EditableMemberList 
                    band={bandInfo} 
                    members={bandInfo && bandInfo.members}
                    handleBandInfoChanged={handleBandInfoChanged} />
            </Tab>
            <Tab eventKey="playlists" title="Playlisty">
                <EditablePlaylistList 
                    playlists={bandInfo && bandInfo.playlists} 
                    band={bandInfo} 
                    handleBandInfoChanged={handleBandInfoChanged}
                    onPlaylistLoad={handlePlaylistLoaded} />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default EditableBand;
