import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";

interface SearchFilterProps {
    onSearchPhraseChanged: Function
}

const SearchFilter: React.FC<SearchFilterProps> = ({onSearchPhraseChanged}) => {

    const [searchPhrase, setSearchPhrase] = useState('');

    return (
    <>
    <FormGroup as={Row}>
        
        <Form.Label column sm="2">
            Szukaj
        </Form.Label>
        <Col sm="10">
            <Form.Control className="col-md-8" type="text" placeholder="Szukaj..." onChange={e => {
                setSearchPhrase(e.target.value);
                onSearchPhraseChanged(e.target.value);
            }} />
        </Col>
    </FormGroup>
    </>
    );
}

export default SearchFilter;
