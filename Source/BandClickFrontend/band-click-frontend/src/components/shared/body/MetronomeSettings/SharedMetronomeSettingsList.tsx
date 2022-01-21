import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { PagedMetronomeSettings } from "../../../../models/MetronomeSettings/PagedMetronomeSettings";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import SharedMetronomeSettingsItem from "./SharedMetronomeSettingsItem";

interface SharedMetronomeSettingsListProps {
    visible: boolean
}

const SharedMetronomeSettingsList: React.FC<SharedMetronomeSettingsListProps> = ({visible}) => {

    const [isActive, setIsActive] = useState(false);
    const [settings, setSettings] = useState({} as PagedMetronomeSettings);

    useEffect(() => {
        setIsActive(visible);
        if (visible) {
            fetchSettings();
        }
    }, [visible]);

    const fetchSettings = () => {
        MetronomeSettingsService.getAllShared()
        .then(result => {
            if (result && result.items.length > 0) {
                setSettings(result);
            }
        });
    }

    return (
    <>
    {
        isActive && settings && settings.items && settings.items.length > 0 &&
        <ListGroup variant="flush">
            {
                settings.items.map((setting, index) => {
                    return <SharedMetronomeSettingsItem key={setting.id} metronomeSettings={setting} />
                })
            }
        </ListGroup>
    }
    {
        isActive && (!settings || !settings.items || settings.items.length === 0) &&
        <p className="fst-italic">Brak udostępnionych ustawień metronomu</p>
    }
    </>
    );
}

export default SharedMetronomeSettingsList;
