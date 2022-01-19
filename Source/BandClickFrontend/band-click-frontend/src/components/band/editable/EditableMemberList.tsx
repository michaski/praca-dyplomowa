import React from "react";
import { Badge, Button, ButtonGroup, ListGroup, Row } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import AddBandMember from "./AddBandMember";
import MemberActionButtons from "./MemberActionButtons";

interface EditableMemberListProps {
    members: UserInBandInfo[],
    band: Band,
    onBandMemberAdded: Function
}

const EditableMemberList: React.FC<EditableMemberListProps> = ({members, band, onBandMemberAdded}) => {

    return (
        <>
        <ListGroup as="ol" numbered>
            {
                members &&
                members.map((member, index) => {
                    const currentMember = members[index];
                    return (
                    <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {member.member.username}
                                {
                                    currentMember.bandRole === 'Leader' &&
                                    <Badge pill>Lider</Badge>
                                }
                            </div>
                            <span className="fst-italic">{}</span>
                        </div>
                        <div>
                            <MemberActionButtons isLeader={currentMember.bandRole === "Leader"} />
                        </div>
                    </ListGroup.Item>
                    );
                })
            }
        </ListGroup>
        <Row>
            <AddBandMember band={band} onBandMemberAdded={onBandMemberAdded} />
        </Row>
        </>
        );
}

export default EditableMemberList;
