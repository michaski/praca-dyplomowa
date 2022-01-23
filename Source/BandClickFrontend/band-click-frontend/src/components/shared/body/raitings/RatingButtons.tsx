import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import PlaylistService from "../../../../services/playlists/playlistService";

interface RaitingButtonsProps {
    subject: string,
    subjectId: string,
    positiveRaitingCount: number,
    negativeRaitingCount: number,
    onUserHasGivenRaiting: Function
}

const RaitingButtons: React.FC<RaitingButtonsProps> = ({subject, subjectId, positiveRaitingCount, negativeRaitingCount, onUserHasGivenRaiting}) => {

    const [userHasGivenRaiting, setUserHasGivenRaiting] = useState(false);
    const [isUserRaitingPositive, setIsUserRaitingPositive] = useState(undefined as boolean | undefined);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token || token === '') {
            return;
        }
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.isUserRatingPositive(subjectId)
            .then(result => {
                if (result === -1) {
                    setUserHasGivenRaiting(false);
                    setIsUserRaitingPositive(undefined);
                } else {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(result === 1 ? true : false);
                }
            });
        } else if (subject === 'playlist') {
            PlaylistService.isUserRatingPositive(subjectId)
            .then(result => {
                if (result === -1) {
                    setUserHasGivenRaiting(false);
                    setIsUserRaitingPositive(undefined);
                } else {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(result === 1 ? true : false);
                }
            });
        }
    }, [userHasGivenRaiting]);

    const removeRaiting = () => {
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.removeUserRaiting(subjectId)
            .then(_ => {
                setUserHasGivenRaiting(false)
                setIsUserRaitingPositive(undefined);
                onUserHasGivenRaiting();
            });
        } else if (subject === 'playlist') {
            PlaylistService.removeUserRaiting(subjectId)
            .then(_ => {
                setUserHasGivenRaiting(false)
                setIsUserRaitingPositive(undefined);
                onUserHasGivenRaiting();
            });
        }
    }

    const addRaiting = (isPositive: boolean) => {
        if (subject === 'metronomeSettings') {
            if (isPositive) {
                MetronomeSettingsService.addPositiveRaiting(subjectId)
                .then(_ => {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(true);
                    onUserHasGivenRaiting();
                });
            } else {
                MetronomeSettingsService.addNegativeRaiting(subjectId)
                .then(_ => {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(false);
                    onUserHasGivenRaiting();
                });
            }
        } else if (subject === 'playlist') {
            if (isPositive) {
                PlaylistService.addPositiveRaiting(subjectId)
                .then(_ => {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(true);
                    onUserHasGivenRaiting();
                });
            } else {
                PlaylistService.addNegativeRaiting(subjectId)
                .then(_ => {
                    setUserHasGivenRaiting(true);
                    setIsUserRaitingPositive(false);
                    onUserHasGivenRaiting();
                });
            }
        }
    }

    const postitiveRaitingToggle = () => {
        setUserHasGivenRaiting(previous => {
            if (previous) {
                removeRaiting();
            } else {
                addRaiting(true);
            }
            return !previous;
        });
    }

    const negativeRaitingToggle = () => {
        setUserHasGivenRaiting(previous => {
            if (previous) {
                removeRaiting();
            } else {
                addRaiting(false);
            }
            return !previous;
        });
    }

    return (
    <>
    <span className="me-2">
        <Button variant={userHasGivenRaiting && isUserRaitingPositive ? "succedd" : "outline-success"} size="sm" onClick={postitiveRaitingToggle}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </Button> {positiveRaitingCount}
    </span>
    <span>
        <Button variant={userHasGivenRaiting && isUserRaitingPositive !== undefined && isUserRaitingPositive === false ? "danger" : "outline-danger"} size="sm" onClick={negativeRaitingToggle}>
            <FontAwesomeIcon icon={faThumbsDown} />
        </Button> {negativeRaitingCount}
    </span>
    </>
    );
}

export default RaitingButtons;
