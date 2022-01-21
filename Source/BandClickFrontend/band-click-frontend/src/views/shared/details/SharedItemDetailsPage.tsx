import React from "react";
import { useParams } from "react-router";
import Header from "../../../components/header/Header";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import SharedMetronomeSettingsDetails from "../../../components/shared/body/MetronomeSettings/SharedMetronomeSettingsDetails";
import SharedPlaylistDetails from "../../../components/shared/body/Playlists/SharedPlaylistDetails";
import auth from "../../../services/auth/auth";

const SharedItemDetailsPage = () => {
    // const { type, id } = useParams();

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
    <SharedMetronomeSettingsDetails />
    <SharedPlaylistDetails />
    </>
    );
}

export default SharedItemDetailsPage;
