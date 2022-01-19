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
        BandService.getAll()
        .then(results => {
            setBands(results);
            setSelectedBand(results[0]);
        });
    }, []);

    const handleSelectedBandChanged = (band: Band) => {
        setSelectedBand(band);
    }

    const handleBandCreated = (band: any) => {

    }

    return (
    <>
    <LoggedInHeader />
    <Container fluid>
        <Row>
            <Col md={10}>
                <BandSelector bands={bands} onSelectedBandChange={(band: Band) => {
                    handleSelectedBandChanged(band);
                }} />
            </Col>
            <Col md={2}>
                <AddBand onBandCreated={handleBandCreated} />
            </Col>
        </Row>
        <Row>
            <Container>
                <EditableBand band={selectedBand} />
            </Container>
        </Row>
    </Container>
    
    </>
    );
}

export default ManagedBands;
