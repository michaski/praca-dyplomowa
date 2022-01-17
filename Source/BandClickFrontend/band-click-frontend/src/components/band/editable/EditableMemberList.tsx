import React from "react";
import { Badge, Button, ButtonGroup, ListGroup, Row } from "react-bootstrap";
import AddBandMember from "./AddBandMember";
import MemberActionButtons from "./MemberActionButtons";

const EditableMemberList = () => {
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
            <MemberActionButtons isLeader={true} />
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 2</div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
            <MemberActionButtons isLeader={false} />
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
            <MemberActionButtons isLeader={false} />
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 4</div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
            <MemberActionButtons isLeader={false} />
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Użytkownik 5</div>
                <span className="fst-italic">mail@mail.com</span>
            </div>
            <MemberActionButtons isLeader={false} />
        </ListGroup.Item>
    </ListGroup>
    <Row>
        <AddBandMember />
    </Row>
    </>
    );
}

export default EditableMemberList;
