import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface MemberActionButtonsProps {
    isLeader: boolean
}

const MemberActionButtons: React.FC<MemberActionButtonsProps> = ({isLeader}) => {
    return (
    <div>
        {
            isLeader &&
            <ButtonGroup size="sm">
                <Button variant={"warning"}>Zdegraduj</Button>
            </ButtonGroup>
        }
        {
        !isLeader &&
        <ButtonGroup size="sm">
            <Button variant={"success"}>Awansuj na lidera</Button>
            <Button variant={"danger"}>Usuń z zespołu</Button>
        </ButtonGroup>
        }
    </div>
    );
}

export default MemberActionButtons;
