import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { User } from "../../../models/Auth/User";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import BandService from "../../../services/bands/bandService";
import UserService from "../../../services/user/userService";
import SimpleMemberList from "./SimpleMemberList";
import SimplePlaylistList from "./SimplePlaylistList";

interface SimpleBandProps {
    band: Band
}

const SimpleBand: React.FC<SimpleBandProps> = ({band}) => {
    const [bandInfo, setBandInfo] = useState(band);

    useEffect(() => {
        if (band.id) {
            BandService.getById(band.id)
            .then(bandDetails => {
                setBandInfo(bandDetails);
            });
        }
    }, [band]);

    return (
    <>
    <Container>
        <h1>{bandInfo && bandInfo.name}</h1>
        <Tabs defaultActiveKey="members" className="mb-3">
            <Tab eventKey="members" title="Członkowie">
                <SimpleMemberList members={bandInfo && bandInfo.members} />
            </Tab>
            <Tab eventKey="playlists" title="Playlisty">
                <SimplePlaylistList playlists={bandInfo && bandInfo.playlists} />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default SimpleBand;
