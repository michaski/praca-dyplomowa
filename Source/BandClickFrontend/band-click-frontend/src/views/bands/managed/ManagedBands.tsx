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
        .then(result => {
            setBands(result);
            setSelectedBand(result[0]);
        });
    }, [setBands, setSelectedBand]);

    const handleBandCreated = (band: any) => {

    }

    return (
    <>
    <LoggedInHeader />
    <Container fluid>
        <Row>
            <Col md={10}>
                <BandSelector bands={bands} onSelectedBandChange={(band: Band) => {
                    setSelectedBand(band);
                }} />
            </Col>
            <Col md={2}>
                <AddBand onBandCreated={handleBandCreated} />
            </Col>
        </Row>
        <Row>
            <Container>
                <EditableBand />
            </Container>
        </Row>
    </Container>
    
    </>
    );
}

export default ManagedBands;
