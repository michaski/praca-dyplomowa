import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../../components/header/Header";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import SharedMetronomeSettingsList from "../../../components/shared/body/MetronomeSettings/SharedMetronomeSettingsList";
import SharedPlaylistList from "../../../components/shared/body/Playlists/SharedPlaylistList";
import SharedSectionFilters from "../../../components/shared/filters/SharedSectionFilters";
import Paginator from "../../../components/shared/pagination/Paginator";
import { OrderByDirection, OrderByValues } from "../../../models/Filters/QueryFilters";
import auth from "../../../services/auth/auth";

const SharedSectionMainPage = () => {

    const [selectedItemType, setSelectedItemType] = useState('all');
    const [selectedMetronomeSettingsType, setSelectedMetronomeSettingsType] = useState('all');
    const [searchPhrase, setSearchPhrase] = useState('');
    const [orderBy, setOrderBy] = useState(undefined as OrderByValues | undefined);
    const [orderByDirection, setOrderByDirection] = useState(undefined as OrderByDirection | undefined);

    const handleSelectedItemTypeChanged = (newSelectedItemType: string) => {
        setSelectedItemType(newSelectedItemType);
    }

    const handleSelectedMetronomeSettingsTypeChange = (newSelectedMetronomeSettingsType: string) => {
        setSelectedMetronomeSettingsType(newSelectedMetronomeSettingsType);
    }

    const handleSearchPhraseChanged = (searchPhrase: string) => {
        setSearchPhrase(searchPhrase);
    }

    const handleOrderByValueChange = (orderByValue: OrderByValues | undefined) => {
        setOrderBy(orderByValue);
    }

    const handleOrderByDirectionChanged = (orderByDirection: OrderByDirection | undefined) => {
        setOrderByDirection(orderByDirection);
    }

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
        <SharedSectionFilters 
            onSelectedItemTypeChange={handleSelectedItemTypeChanged}
            onSelectedMetronomeSettingsTypeChange={handleSelectedMetronomeSettingsTypeChange}
            onSearchPhraseChanged={handleSearchPhraseChanged}
            onOrderByValueChange={handleOrderByValueChange}
            onOrderByDirectionChanged={handleOrderByDirectionChanged} />
    </div>
    <Row>
        {
            selectedItemType === 'all' &&
            <>
                <SharedMetronomeSettingsList 
                    visible={true}
                    selectedMetronomeSettingsType={selectedMetronomeSettingsType}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection} />
                <SharedPlaylistList 
                    visible={true}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection} />
            </>
        }
        {
            selectedItemType === 'metronomeSettings' &&
            <>
                <SharedMetronomeSettingsList 
                    visible={true}
                    selectedMetronomeSettingsType={selectedMetronomeSettingsType}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection} />
            </>
        }
        {
            selectedItemType === 'playlists' &&
            <>
                <SharedPlaylistList 
                    visible={true}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection} />
            </>
        }
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
