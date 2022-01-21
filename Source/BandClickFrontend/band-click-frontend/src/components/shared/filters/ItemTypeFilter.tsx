import React, { useEffect, useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

interface ItemTypeFilterProps {
    onSelectedItemTypeChange: Function
}

const ItemTypeFilter: React.FC<ItemTypeFilterProps> = ({onSelectedItemTypeChange}) => {

    const [selectedType, setSelectedType] = useState('all');

    return (
    <>
    <FormGroup as={Row}>
        <Form.Label column sm="5">
            Rodzaj pozycji
        </Form.Label>
        <Col sm="7">
            <Form.Select id={'type-select'} aria-label="Rodzaj" value={selectedType} onChange={e => {
                setSelectedType(e.target.value);
                onSelectedItemTypeChange(e.target.value);
            }}>
                <option value="all">Wszystkie</option>
                <option value="metronomeSettings">Ustawienia metronomu</option>
                <option value="playlists">Playlisty</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default ItemTypeFilter;
