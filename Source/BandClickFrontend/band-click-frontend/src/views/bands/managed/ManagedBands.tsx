import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BandSelector from "../../../components/band/BandSelector";
import AddBand from "../../../components/band/editable/AddBand";
import EditableBand from "../../../components/band/editable/EditableBand";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import { Band } from "../../../models/Bands/Band";
import BandService from "../../../services/bands/bandService";

const ManagedBands = () => {
    const [bands, setBands] = useState([] as Band[]);
    const [selectedBand, setSelectedBand] = useState({} as Band);

    useEffect(() => {
        BandService.getAllManaged()
        .then(results => {
            if (results && results.length > 0) {
                setBands(results);
                if (!selectedBand || !selectedBand.id) {
                    setSelectedBand(results[0]);
                }
            }
        });
    }, [selectedBand]);

    const handleSelectedBandChanged = (band: Band) => {
        setSelectedBand(band);
    }

    const handleBandCreated = (band: Band) => {
        setSelectedBand(band);
    }

    const handleBandDeleted = (band: Band) => {
        setSelectedBand(bands.filter(b => b.id !== band.id)[0]);
    }

    return (
    <>
    <LoggedInHeader />
    <Container fluid className="mt-4">
        {
        bands && bands.length > 0 && selectedBand && selectedBand.id &&
        <>
        <AddBand onBandCreated={handleBandCreated} />
        <span className="mb-1 ms-3">lub wybierz z listy:</span>
        <Row className="mt-0">
            <Col md={12}>
                <BandSelector bands={bands} selectedBand={selectedBand} onSelectedBandChange={(band: Band) => {
                    handleSelectedBandChanged(band);
                }} />
            </Col>
        </Row>
        <Row>
            <Container>
                <EditableBand band={selectedBand} onBandDeleted={handleBandDeleted} />
            </Container>
        </Row>
        </>
        }
        {
            (!bands || bands.length === 0 || !selectedBand || selectedBand.id === '') &&
            <>
            <p className="fst-italic">Nie zarządzasz żadnymi zespołami</p>
            <AddBand onBandCreated={handleBandCreated} />
            </>
        }
    </Container>
    
    </>
    );
}

export default ManagedBands;
