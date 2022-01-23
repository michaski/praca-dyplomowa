import React, { useEffect, useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

interface ItemTypeFilterProps {
    onSelectedItemTypeChange: Function
}

const ItemTypeFilter: React.FC<ItemTypeFilterProps> = ({onSelectedItemTypeChange}) => {

    const [selectedType, setSelectedType] = useState('metronomeSettings');

    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="4" className="mx-0 px-0">
            Rodzaj pozycji
        </Form.Label>
        <Col sm="8" className="px-0">
            <Form.Select className="mx-0" id={'type-select'} aria-label="Rodzaj" value={selectedType} onChange={e => {
                setSelectedType(e.target.value);
                onSelectedItemTypeChange(e.target.value);
            }}>
                <option value="metronomeSettings">Ustawienia metronomu</option>
                <option value="playlists">Playlisty</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default ItemTypeFilter;
