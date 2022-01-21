import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { OrderByDirection, OrderByValues } from "../../../models/Filters/QueryFilters";
import ItemTypeFilter from "./ItemTypeFilter";
import MetronomeSettingsTypeFilter from "./MetronomeSettingsTypeFilter";
import OrderByDirectionFilter from "./OrderByDirectionFilter";
import OrderByFilter from "./OrderByFilter";
import SearchFilter from "./SearchFilter";

interface SharedSectionFiltersProps {
    onSelectedItemTypeChange: Function,
    onSelectedMetronomeSettingsTypeChange: Function,
    onSearchPhraseChanged: Function,
    onOrderByValueChange: Function,
    onOrderByDirectionChanged: Function
}

const SharedSectionFilters: React.FC<SharedSectionFiltersProps> = ({onSelectedItemTypeChange, onSelectedMetronomeSettingsTypeChange, onSearchPhraseChanged, onOrderByValueChange, onOrderByDirectionChanged}) => {

    const [isMetronomeSettingsTypeFilterVisible, setIsMetronomeSettingsTypeFilterVisible] = useState(false);

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
    <div className="d-flex justify-content-around">
            <div>
                <ItemTypeFilter onSelectedItemTypeChange={handleSelectedItemTypeChanged} />
                {
                    isMetronomeSettingsTypeFilterVisible &&
                    <MetronomeSettingsTypeFilter onSelectedMetronomeSettingsTypeChange={handleSelectedMetronomeSettingsTypeChanged} />
                }
            </div>
            <div>
                <SearchFilter onSearchPhraseChanged={handleSearchPhraseChanged} />
            </div>
            <div>
                <OrderByFilter onOrderByValueChange={handleOrderByValueChange} />
                <OrderByDirectionFilter onOrderByDirectionChanged={handleOrderByDirectionChanged} />
            </div>
    </div>
    </>
    );
}

export default SharedSectionFilters;
