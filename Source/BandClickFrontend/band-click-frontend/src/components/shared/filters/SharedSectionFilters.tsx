import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { OrderByDirection, OrderByValues } from "../../../models/Filters/QueryFilters";
import ItemTypeFilter from "./ItemTypeFilter";
import MetronomeSettingsTypeFilter from "./MetronomeSettingsTypeFilter";
import OrderByDirectionFilter from "./OrderByDirectionFilter";
import OrderByFilter from "./OrderByFilter";
import SearchFilter from "./SearchFilter";
import './filters.css';

interface SharedSectionFiltersProps {
    onSelectedItemTypeChange: Function,
    onSelectedMetronomeSettingsTypeChange: Function,
    onSearchPhraseChanged: Function,
    onOrderByValueChange: Function,
    onOrderByDirectionChanged: Function
}

const SharedSectionFilters: React.FC<SharedSectionFiltersProps> = ({onSelectedItemTypeChange, onSelectedMetronomeSettingsTypeChange, onSearchPhraseChanged, onOrderByValueChange, onOrderByDirectionChanged}) => {

    const [isMetronomeSettingsTypeFilterVisible, setIsMetronomeSettingsTypeFilterVisible] = useState(true);

    const handleSelectedItemTypeChanged = (itemType: string) => {
        if (itemType === 'metronomeSettings') {
            setIsMetronomeSettingsTypeFilterVisible(true);
        } else {
            setIsMetronomeSettingsTypeFilterVisible(false);
        }
        onSelectedItemTypeChange(itemType);
    }

    const handleSelectedMetronomeSettingsTypeChanged = (metrononmeSettingsType: string) => {
        onSelectedMetronomeSettingsTypeChange(metrononmeSettingsType);
    }

    const handleSearchPhraseChanged = (searchPhrase: string) => {
        onSearchPhraseChanged(searchPhrase);
    }

    const handleOrderByValueChange = (orderByValue: OrderByValues | undefined) => {
        onOrderByValueChange(orderByValue);
    }

    const handleOrderByDirectionChanged = (orderByDirection: OrderByDirection | undefined) => {
        onOrderByDirectionChanged(orderByDirection);
    }

    return (
    <>
    <div className="row justify-content-md-between justify-content-sm-center text-start mb-4">
            <div className="col-md-4 filter">
                <ItemTypeFilter onSelectedItemTypeChange={handleSelectedItemTypeChanged} />
                {
                    isMetronomeSettingsTypeFilterVisible &&
                    <MetronomeSettingsTypeFilter onSelectedMetronomeSettingsTypeChange={handleSelectedMetronomeSettingsTypeChanged} />
                }
            </div>
            <div className="col-md-4 col-sm-8 filter">
                <SearchFilter onSearchPhraseChanged={handleSearchPhraseChanged} />
            </div>
            <div className="col-md-4 filter">
                <OrderByFilter onOrderByValueChange={handleOrderByValueChange} />
                <OrderByDirectionFilter onOrderByDirectionChanged={handleOrderByDirectionChanged} />
            </div>
    </div>
    </>
    );
}

export default SharedSectionFilters;
