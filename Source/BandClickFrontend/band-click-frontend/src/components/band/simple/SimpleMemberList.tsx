import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { User } from '../../../models/Auth/User';
import { UserInBandInfo } from '../../../models/Bands/UserInBandInfo';
import UserService from '../../../services/user/userService';

interface SimpleMemberListProps {
    members: UserInBandInfo[]
}

const SimpleMemberList: React.FC<SimpleMemberListProps> = ({members}) => {
    
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
                </ListGroup.Item>
                );
            })
        }
    </ListGroup>
    </>
    );
}

export default SimpleMemberList;
