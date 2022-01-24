import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderByDirection, OrderByValues } from "../../../../models/Filters/QueryFilters";
import { PagedMetronomeSettings } from "../../../../models/MetronomeSettings/PagedMetronomeSettings";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import SharedMetronomeSettingsItem from "./SharedMetronomeSettingsItem";

interface SharedMetronomeSettingsListProps {
    visible: boolean,
    page: number,
    pageSize: number,
    selectedMetronomeSettingsType: string,
    searchPhrase: string,
    orderBy?: OrderByValues,
    orderByDirection?: OrderByDirection,
    onPaginationDataCollected: Function
}

const SharedMetronomeSettingsList: React.FC<SharedMetronomeSettingsListProps> = ({visible, page, pageSize, searchPhrase, selectedMetronomeSettingsType, orderBy, orderByDirection, onPaginationDataCollected}) => {

    const [isActive, setIsActive] = useState(false);
    const [settings, setSettings] = useState({} as PagedMetronomeSettings);

    useEffect(() => {
        setIsActive(visible);
        if (visible) {
            fetchSettings();
        }
    }, [visible, searchPhrase, selectedMetronomeSettingsType, orderBy, orderByDirection]);

    const fetchSettings = () => {
        MetronomeSettingsService.getAllShared({
            search: searchPhrase === '' ? undefined : searchPhrase,
            type: selectedMetronomeSettingsType === 'all' ? undefined : selectedMetronomeSettingsType,
            orderBy: (orderByDirection && !orderBy) ? OrderByValues.DEFAULT : orderBy,
            orderByDirection: (orderBy && !orderByDirection) ? OrderByDirection.DEFAULT : orderByDirection,
            page: page,
            pageSize: pageSize
        })
        .then(result => {
            if (result && result.items && result.items.length >= 0) {
                setSettings(result);
                onPaginationDataCollected(result.totalPages, result.itemsFrom, result.itemsTo, result.totalItemsCount);
            }
        });
    }

    return (
    <>
    {
        isActive && settings && settings.items && settings.items.length > 0 &&
        <ListGroup variant="flush">
            {
                settings.items.map((setting, index) => {
                    return <SharedMetronomeSettingsItem key={setting.id} metronomeSettings={setting} onItemDeleted={fetchSettings} />
                })
            }
        </ListGroup>
    }
    {
        isActive && (!settings || !settings.items || settings.items.length === 0) &&
        <p className="fst-italic">Brak udostępnionych ustawień metronomu</p>
    }
    </>
    );
}

export default SharedMetronomeSettingsList;
