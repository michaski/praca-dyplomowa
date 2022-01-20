import React from "react";
import { ListGroup } from "react-bootstrap";
import SharedMetronomeSettingsItem from "./SharedMetronomeSettingsItem";

const SharedMetronomeSettingsList = () => {
    return (
    <>
    <ListGroup variant="flush">
        <SharedMetronomeSettingsItem />
        <SharedMetronomeSettingsItem />
        <SharedMetronomeSettingsItem />
    </ListGroup>
    </>
    );
}

export default SharedMetronomeSettingsList;
