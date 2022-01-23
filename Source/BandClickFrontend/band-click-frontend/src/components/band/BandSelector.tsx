import React, { useEffect, useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { Band } from "../../models/Bands/Band";
import BandService from "../../services/bands/bandService";

interface BandSelectorProps {
    bands: Band[],
    selectedBand: Band,
    onSelectedBandChange: Function
}

const BandSelector: React.FC<BandSelectorProps> = ({bands, selectedBand, onSelectedBandChange}) => {

    const handleSelectedBandChanged = (selectedBandIndex: string) => {
        onSelectedBandChange(bands.find(b => b.id === selectedBandIndex));
    }

    return (
    <Form.Group as={Row} className="d-flex mb-3 align-items-center justify-content-center">
        <Col sm="4" className="px-0 mx-0">
            <Form.Select className="mx-0" value={selectedBand.id} onChange={e => handleSelectedBandChanged(e.target.value)}>
                {
                    bands && bands.length > 0 &&
                    bands.map((band, index) => {
                        return <option key={index} value={band.id}>{band.name}</option>
                    })
                }
            </Form.Select>
        </Col>
    </Form.Group>
    );
}

export default BandSelector;
