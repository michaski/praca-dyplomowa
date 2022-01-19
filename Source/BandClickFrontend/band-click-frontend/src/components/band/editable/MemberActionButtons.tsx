import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import BandService from "../../../services/bands/bandService";

interface MemberActionButtonsProps {
    memberInfo: UserInBandInfo,
    band: Band,
    onMemberDelete: Function
}

const MemberActionButtons: React.FC<MemberActionButtonsProps> = ({memberInfo, band, onMemberDelete}) => {

    const handleMemberDelete = () => {
        BandService.removeMember({
            bandId: band.id,
            username: memberInfo.member.username
        }).then(_ => {
            onMemberDelete(memberInfo);
        });
    }

    return (
    <div>
        {
            memberInfo.bandRole === 'Leader' &&
            <ButtonGroup size="sm">
                <Button variant={"warning"}>Zdegraduj</Button>
            </ButtonGroup>
        }
        {
        memberInfo.bandRole !== 'Leader' &&
        <ButtonGroup size="sm">
            <Button variant={"success"}>Awansuj na lidera</Button>
            <Button variant={"danger"} onClick={handleMemberDelete}>Usuń z zespołu</Button>
        </ButtonGroup>
        }
    </div>
    );
}

export default MemberActionButtons;
