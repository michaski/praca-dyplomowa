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
            <Form.Control className="col-md-8" type="text" placeholder="Szukaj..." onChange={e => {
                setSearchPhrase(e.target.value);
                onSearchPhraseChanged(e.target.value);
            }} />
    </FormGroup>
    </>
    );
}

export default SearchFilter;
