import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

const SimpleMemberList = () => {
    return (
    <>
    <ListGroup as="ol" numbered>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 1<Badge pill>Lider</Badge></div>
                    <span className="fst-italic">mail@mail.com</span>
                </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 2</div>
                    <span className="fst-italic">mail@mail.com</span>
                </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    Użytkownik 3
                </div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 4</div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 5</div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
        </ListGroup.Item>
    </ListGroup>
    </>
    );
}

export default SimpleMemberList;
