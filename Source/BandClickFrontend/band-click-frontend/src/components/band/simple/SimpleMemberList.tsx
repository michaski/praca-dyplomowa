import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { User } from '../../../models/Auth/User';
import { UserInBandInfo } from '../../../models/Bands/UserInBandInfo';
import UserService from '../../../services/user/userService';

interface SimpleMemberListProps {
    members: UserInBandInfo[]
}

const SimpleMemberList: React.FC<SimpleMemberListProps> = ({members}) => {
    
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
    <ListGroup as="ol" numbered>{
                leaders && leaders.length > 0 &&
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
                    </ListGroup.Item>
                    );
                })
            }
            {
                membersList && membersList.length > 0 &&
                membersList.map((member, index) => {
                    return (
                    <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {member.member.username}
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
