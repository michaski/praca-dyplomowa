import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../../components/header/Header";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import SharedMetronomeSettingsList from "../../../components/shared/body/MetronomeSettings/SharedMetronomeSettingsList";
import SharedPlaylistList from "../../../components/shared/body/Playlists/SharedPlaylistList";
import SharedSectionFilters from "../../../components/shared/filters/SharedSectionFilters";
import Paginator from "../../../components/shared/pagination/Paginator";
import auth from "../../../services/auth/auth";

const SharedSectionMainPage = () => {
    return (
    <>
    {
        auth.getToken() && auth.getToken().length > 0 &&
        <LoggedInHeader />
    }
    {
        (!auth.getToken() || auth.getToken().length === 0) &&
        <Header />
    }
    <h2>Udostępnione</h2>
    <div>
        <SharedSectionFilters />
    </div>
    <Row>
        <SharedMetronomeSettingsList visible={true} />
        <SharedPlaylistList />
    </Row>
    <Row>
        <div>
            <Paginator />
        </div>
    </Row>
    </>
    );
}

export default SharedSectionMainPage;
