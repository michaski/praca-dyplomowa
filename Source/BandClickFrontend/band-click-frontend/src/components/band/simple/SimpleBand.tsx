import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAction } from "../../../hooks/useAction";
import { User } from "../../../models/Auth/User";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import { Playlist } from "../../../models/Playlists/Playlist";
import BandService from "../../../services/bands/bandService";
import { PlaylistStoreService } from "../../../services/playlists/playlistStoreService";
import UserService from "../../../services/user/userService";
import SimpleMemberList from "./SimpleMemberList";
import SimplePlaylistList from "./SimplePlaylistList";

interface SimpleBandProps {
    band: Band
}

const SimpleBand: React.FC<SimpleBandProps> = ({band}) => {
    const [bandInfo, setBandInfo] = useState(band);
    const playlistStoreActions = useAction(PlaylistStoreService);
    const history = useHistory();

    useEffect(() => {
        if (band.id) {
            BandService.getById(band.id)
            .then(bandDetails => {
                setBandInfo(bandDetails);
            });
        }
    }, [band]);

    const handlePlaylistLoaded = (playlist: Playlist) => {
        playlistStoreActions.setSelectedPlaylist(playlist);
        history.push(`/app/${band.id}/${playlist.id}`);
    }

    return (
    <>
    <Container>
        <h1 className="mt-3 mb-4">
            <span className="border-bottom pb-2"><span className="px-4">{bandInfo && bandInfo.name}</span></span>
        </h1>
        <Tabs defaultActiveKey="members" className="mb-3">
            <Tab eventKey="members" title="Członkowie">
                <SimpleMemberList members={bandInfo && bandInfo.members} />
            </Tab>
            <Tab eventKey="playlists" title="Playlisty">
                <SimplePlaylistList playlists={bandInfo && bandInfo.playlists} onPlaylistLoad={handlePlaylistLoaded} />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default SimpleBand;
