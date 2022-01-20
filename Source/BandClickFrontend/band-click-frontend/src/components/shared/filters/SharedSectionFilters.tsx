import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemTypeFilter from "./ItemTypeFilter";
import MetronomeSettingsTypeFilter from "./MetronomeSettingsTypeFilter";
import OrderByDirectionFilter from "./OrderByDirectionFilter";
import OrderByFilter from "./OrderByFilter";
import SearchFilter from "./SearchFilter";

const SharedSectionFilters = () => {
    return (
    <>
    <div className="d-flex justify-content-around">
            <div>
                <ItemTypeFilter />
                <MetronomeSettingsTypeFilter />
            </div>
            <div>
                <SearchFilter />
            </div>
            <div>
                <OrderByFilter />
                <OrderByDirectionFilter />
            </div>
    </div>
    </>
    );
}

export default SharedSectionFilters;
