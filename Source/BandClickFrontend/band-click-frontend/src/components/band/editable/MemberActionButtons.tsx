import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { UserInBandInfo } from "../../../models/Bands/UserInBandInfo";
import BandService from "../../../services/bands/bandService";

interface MemberActionButtonsProps {
    memberInfo: UserInBandInfo,
    band: Band,
    handleBandInfoChanged: Function
}

const MemberActionButtons: React.FC<MemberActionButtonsProps> = ({memberInfo, band, handleBandInfoChanged}) => {

    const handleMemberDelete = () => {
        BandService.removeMember({
            bandId: band.id,
            username: memberInfo.member.username
        }).then(_ => {
            handleBandInfoChanged(memberInfo);
        });
    }

    const handlePromoteMember = () => {
        BandService.promoteMember({
            bandId: band.id,
            username: memberInfo.member.username
        }).then(_ => {
            handleBandInfoChanged(memberInfo);
        });
    }

    const handleDemoteMember = () => {
        BandService.demoteMember({
            bandId: band.id,
            username: memberInfo.member.username
        }).then(_ => {
            handleBandInfoChanged(memberInfo);
        });
    }

    return (
    <div>
        {
            memberInfo.bandRole === 'Leader' &&
            <ButtonGroup size="sm">
                <Button variant={"warning"} onClick={handleDemoteMember}>Zdegraduj</Button>
            </ButtonGroup>
        }
        {
        memberInfo.bandRole !== 'Leader' &&
        <ButtonGroup size="sm">
            <Button variant={"success"} onClick={handlePromoteMember}>Awansuj na lidera</Button>
            <Button variant={"danger"} onClick={handleMemberDelete}>Usuń z zespołu</Button>
        </ButtonGroup>
        }
    </div>
    );
}

export default MemberActionButtons;
