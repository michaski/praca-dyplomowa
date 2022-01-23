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

    const [selectedItemType, setSelectedItemType] = useState('metronomeSettings');
    const [selectedMetronomeSettingsType, setSelectedMetronomeSettingsType] = useState('all');
    const [searchPhrase, setSearchPhrase] = useState('');
    const [orderBy, setOrderBy] = useState(undefined as OrderByValues | undefined);
    const [orderByDirection, setOrderByDirection] = useState(undefined as OrderByDirection | undefined);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [itemsFrom, setItemsFrom] = useState(1);
    const [itemsTo, setItemsTo] = useState(15);
    const [totalItemsCount, setTotalItemsCount] = useState(15);

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

    const handlePageChanged = (selectedPage: number) => {
        setPage(selectedPage);
    }

    const handlePaginationDataCollected = (totalPages: number, itemsFrom: number, itemsTo: number, totalItemsCount: number) => {
        setTotalPages(totalPages);
        setItemsFrom(itemsFrom);
        setItemsTo(itemsTo);
        setTotalItemsCount(totalItemsCount);
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
    <h1 className="mt-4 mb-4">
        <span className="border-bottom pb-2"><span className="px-4">Udostępnione</span></span>
    </h1>
    <div>
        <SharedSectionFilters 
            onSelectedItemTypeChange={handleSelectedItemTypeChanged}
            onSelectedMetronomeSettingsTypeChange={handleSelectedMetronomeSettingsTypeChange}
            onSearchPhraseChanged={handleSearchPhraseChanged}
            onOrderByValueChange={handleOrderByValueChange}
            onOrderByDirectionChanged={handleOrderByDirectionChanged} />
    </div>
    <Row className="mb-4">
        {
            selectedItemType === 'metronomeSettings' &&
            <>
                <SharedMetronomeSettingsList 
                    visible={true}
                    page={page}
                    pageSize={itemsPerPage}
                    selectedMetronomeSettingsType={selectedMetronomeSettingsType}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection}
                    onPaginationDataCollected={handlePaginationDataCollected} />
            </>
        }
        {
            selectedItemType === 'playlists' &&
            <>
                <SharedPlaylistList 
                    visible={true}
                    page={page}
                    pageSize={itemsPerPage}
                    searchPhrase={searchPhrase}
                    orderBy={orderBy}
                    orderByDirection={orderByDirection}
                    onPaginationDataCollected={handlePaginationDataCollected} />
            </>
        }
    </Row>
    <Row>
        <div>
            <Paginator
                page={page}
                totalPages={totalPages}
                itemsFrom={itemsFrom}
                itemsTo={itemsTo}
                totalItemsCount={totalItemsCount}
                onPageChanged={handlePageChanged} />
        </div>
    </Row>
    </>
    );
}

export default SharedSectionMainPage;
