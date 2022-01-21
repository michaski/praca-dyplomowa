import { stringify } from "querystring";
import React from "react";
import { useParams } from "react-router";
import Header from "../../../components/header/Header";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import SharedMetronomeSettingsDetails from "../../../components/shared/body/MetronomeSettings/SharedMetronomeSettingsDetails";
import SharedPlaylistDetails from "../../../components/shared/body/Playlists/SharedPlaylistDetails";
import auth from "../../../services/auth/auth";

interface SharedItemDetailsPageParams {
    type: string,
    id: string
}

const SharedItemDetailsPage = () => {
    
    const { type, id } = useParams<SharedItemDetailsPageParams>();

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
    {
        type === 'metronomeSettings' &&
        <SharedMetronomeSettingsDetails id={id} />
    }
    {
        type === 'playlist' &&
        <SharedPlaylistDetails id ={id} />
    }
    </>
    );
}

export default SharedItemDetailsPage;
