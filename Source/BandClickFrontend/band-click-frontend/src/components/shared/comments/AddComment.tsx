import React from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = () => {
    return (
    <>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="d-flex">Dodaj komentarz</Form.Label>
        <Form.Control as="textarea" placeholder="Treść komentarza..." />
        <Button>Dodaj</Button>
    </Form.Group>
    </>
    );
}

export default AddComment;
