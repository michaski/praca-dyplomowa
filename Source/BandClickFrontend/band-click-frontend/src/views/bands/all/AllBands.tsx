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
            if (results && results.length > 0) {
                setBands(results);
                setSelectedBand(results[0]);
            }
        });
    }, []);

    const handleSelectedBandChanged = (band: Band) => {
        setSelectedBand(band);
    }

    return (
    <>
    <LoggedInHeader />
    <Container fluid className="mt-4">
        <p className="mb-2">Wybierz zespół:</p>
        {
        bands && bands.length > 0 && selectedBand && selectedBand.id &&
        <>
        <Row className="">
            <BandSelector bands={bands} selectedBand={selectedBand} onSelectedBandChange={(band: Band) => {
                handleSelectedBandChanged(band);
            }} />
        </Row>
        <Row className="mt-4">
            <Container>
                <SimpleBand band={selectedBand} />
            </Container>
        </Row>
        </>
        }
        {
            (!bands || bands.length === 0 || !selectedBand || selectedBand.id === '') &&
            <>
            <p className="fst-italic">Nie należysz do żadnych zespołów</p>
            </>
        }
    </Container>
    </>
    );
}

export default AllBands;
