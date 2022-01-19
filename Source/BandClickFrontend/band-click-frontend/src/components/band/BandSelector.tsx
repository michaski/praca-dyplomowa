import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Band } from "../../models/Bands/Band";
import BandService from "../../services/bands/bandService";

interface BandSelectorProps {
    bands: Band[],
    onSelectedBandChange: Function
}

const BandSelector: React.FC<BandSelectorProps> = ({bands, onSelectedBandChange}) => {
    console.log('BandSelector render with:');
    console.log(bands);

    const handleSelectedBandChanged = (selectedBandIndex: string) => {
        const indexValue = parseInt(selectedBandIndex);
        onSelectedBandChange(bands[indexValue]);
    }

    return (
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
            Wybierz zespół:
        </Form.Label>
        <Col sm="10">
            <Form.Select size="lg" onChange={e => handleSelectedBandChanged(e.target.value)}>
                {
                    bands && bands.length > 0 &&
                    bands.map((band, index) => {
                        console.log('rendering band:');
                        console.log(band);
                        return <option key={index} value={index}>{band.name}</option>
                    })
                }
            </Form.Select>
        </Col>
    </Form.Group>
    );
}

export default BandSelector;
