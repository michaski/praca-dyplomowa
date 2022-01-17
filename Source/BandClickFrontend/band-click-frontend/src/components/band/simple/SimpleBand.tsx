import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import SimpleMemberList from "./SimpleMemberList";
import SimplePlaylistList from "./SimplePlaylistList";

const SimpleBand = () => {
    return (
    <>
    <Container>
        <h1>Nazwa zespołu</h1>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Członkowie">
                <SimpleMemberList />
            </Tab>
            <Tab eventKey="profile" title="Playlisty">
                <SimplePlaylistList />
            </Tab>
        </Tabs>
    </Container>
    </>
    );
}

export default SimpleBand;
