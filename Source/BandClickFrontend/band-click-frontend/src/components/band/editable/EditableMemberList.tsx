import React, { useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, ListGroup, Row } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import AddBandMember from "./AddBandMember";
import MemberActionButtons from "./MemberActionButtons";

interface EditableMemberListProps {
    members: UserInBandInfo[],
    band: Band,
    handleBandInfoChanged: Function
}

const EditableMemberList: React.FC<EditableMemberListProps> = ({members, band, handleBandInfoChanged}) => {
    
    const [leaders, setLeaders] = useState([] as UserInBandInfo[]);
    const [membersList, setMembersList] = useState([] as UserInBandInfo[]);

    useEffect(() => {
        if (members) {
            setLeaders(members.filter(m => m.bandRole === 'Leader'));
            setMembersList(members.filter(m => m.bandRole === 'Member'));
        }
    }, [members]);

    return (
        <>
        <ListGroup as="ol" numbered>
            {
                leaders &&
                leaders.map((leader, index) => {
                    return (
                    <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start p-3">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {leader.member.username}
                                <Badge pill className='ms-2'>Lider</Badge>
                            </div>
                            <span className="fst-italic">{}</span>
                        </div>
                        <div>
                            <MemberActionButtons 
                                memberInfo={leader} 
                                band={band}
                                handleBandInfoChanged={handleBandInfoChanged} />
                        </div>
                    </ListGroup.Item>
                    );
                })
            }
            {
                membersList &&
                membersList.map((member, index) => {
                    return (
                    <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {member.member.username}
                            </div>
                            <span className="fst-italic">{}</span>
                        </div>
                        <div>
                            <MemberActionButtons 
                                memberInfo={membersList[index]} 
                                band={band}
                                handleBandInfoChanged={handleBandInfoChanged} />
                        </div>
                    </ListGroup.Item>
                    );
                })
            }
        </ListGroup>
        <Row className="mt-3">
            <AddBandMember band={band} onBandMemberAdded={handleBandInfoChanged} />
        </Row>
        </>
        );
}

export default EditableMemberList;
