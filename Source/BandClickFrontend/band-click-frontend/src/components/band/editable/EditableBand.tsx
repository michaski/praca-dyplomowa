import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import EditableMemberList from "./EditableMemberList";
import EditablePlaylistList from "./EditablePlaylistList";

const EditableBand = () => {
    return (
        <>
        <Container>
        <h1>Nazwa zespołu</h1>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Członkowie">
                <EditableMemberList />
            </Tab>
            <Tab eventKey="profile" title="Playlisty">
                <EditablePlaylistList />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default EditableBand;
