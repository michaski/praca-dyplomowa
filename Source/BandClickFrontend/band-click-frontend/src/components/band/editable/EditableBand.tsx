import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import BandService from "../../../services/bands/bandService";
import EditableMemberList from "./EditableMemberList";
import EditablePlaylistList from "./EditablePlaylistList";

interface EditableBandProps {
    band: Band
}

const EditableBand: React.FC<EditableBandProps> = ({band}) => {
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
                <EditableMemberList members={bandInfo && bandInfo.members} />
            </Tab>
            <Tab eventKey="playlists" title="Playlisty">
                <EditablePlaylistList playlists={bandInfo && bandInfo.playlists} />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default EditableBand;
