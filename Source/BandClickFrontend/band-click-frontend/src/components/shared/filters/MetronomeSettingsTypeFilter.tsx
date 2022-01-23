import React, { useState } from "react";
import { Form, FormGroup, Row, Col } from "react-bootstrap";

interface MetronomeSettingsTypeFilterProps {
    onSelectedMetronomeSettingsTypeChange: Function
}

const MetronomeSettingsTypeFilter: React.FC<MetronomeSettingsTypeFilterProps> = ({onSelectedMetronomeSettingsTypeChange}) => {

    const [selectedMetronomeSettingsType, setSelectedMetronomeSettingsType] = useState('all');

    return (
    <>
    <FormGroup as={Row} className="mt-2">
        <Form.Label column sm="5" className="mx-0 px-0">
            Typ ustawień
        </Form.Label>
        <Col sm="7" className="px-0">
            <Form.Select className="mx-0" id={'type-select'} aria-label="Rodzaj" value={selectedMetronomeSettingsType} onChange={e => {
                setSelectedMetronomeSettingsType(e.target.value);
                onSelectedMetronomeSettingsTypeChange(e.target.value);
            }}>
                <option value="all">Wszystkie</option>
                <option value="Song">Piosenki</option>
                <option value="Exercise">Ćwiczenia</option>
            </Form.Select>
        </Col>
    </FormGroup>
    </>
    );
}

export default MetronomeSettingsTypeFilter;
