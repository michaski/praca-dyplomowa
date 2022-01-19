import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BandSelector from "../../../components/band/BandSelector";
import SimpleBand from "../../../components/band/simple/SimpleBand";
import LoggedInHeader from "../../../components/header/LoggedInHeader";
import { Band } from "../../../models/Bands/Band";
import BandService from "../../../services/bands/bandService";

const AllBands = () => {
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

    return (
    <>
    <LoggedInHeader />
    <Container fluid>
        <Row>
            <BandSelector bands={bands} onSelectedBandChange={(band: Band) => {
                handleSelectedBandChanged(band);
            }} />
        </Row>
        <Row>
            <Container>
                <SimpleBand band={selectedBand} />
            </Container>
        </Row>
    </Container>
    </>
    );
}

export default AllBands;
