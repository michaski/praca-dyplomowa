import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import metronomeSettingsSelector from "../../store/selectors/metronomeSettings.selector";

interface AccentPickerProps {
    beatsPerBar: number,
    accentedBeats?: boolean[],
    onAccentPatternChange: Function
}

const AccentPicker: React.FC<AccentPickerProps> = ({onAccentPatternChange}) => {
    const accentedBeats = useSelector(metronomeSettingsSelector.getAccentedBeats);
    const beatsPerBar = useSelector(metronomeSettingsSelector.getBeatsPerBar);
    const [accentMap, setAccentMap] = useState([] as boolean[]);

    const mapAccentedBeatsToAccentMap = (accentedBeats: number[]): boolean[] => {
        let newMap: boolean[] = [];
        for (let i = 0; i<beatsPerBar; i++) {
            newMap[i] = accentedBeats.includes(i + 1) || false;
        }
        return newMap;
    }

    const mapAccentMapToAccentedBeats = (accentMap: boolean[]): number[] => {
        let accentedBeats: number[] = [];
        accentMap.forEach((isAccented, index) => {
            if (isAccented) {
                accentedBeats.push(index + 1);
            }
        });
        return accentedBeats;
    }

    useEffect(() => {
        setAccentMap(mapAccentedBeatsToAccentMap(accentedBeats));
    }, [accentedBeats, beatsPerBar]);

    const generateAccentMap = () => {
        if (beatsPerBar !== accentMap.length) {
            let newAccentMap: boolean[] = [];
            if (beatsPerBar < accentMap.length) {
                newAccentMap = accentMap.slice(0, beatsPerBar);
                setAccentMap(newAccentMap);
                onAccentPatternChange(newAccentMap);
            } else {
                let newAccentMap = Array.from(accentMap);
                for (let i = accentMap.length; i < beatsPerBar; i++) {
                    newAccentMap[i] = false;
                }
                setAccentMap(newAccentMap);
                onAccentPatternChange(newAccentMap);
            }
        }
    }

    const toggleAccentStatus = (accentIndex: number) => {
        const modifiedAccentMap = accentMap.map((item, index) =>
            index === accentIndex ? !item : item
        );
        setAccentMap(modifiedAccentMap);
        onAccentPatternChange(modifiedAccentMap);
    }

    return (
        <div>
            <h2>Akcenty</h2>
            {
            accentMap.map((isAccented, index) => {
                return <input key={index} type={'checkbox'} checked={isAccented} onChange={e => {
                    toggleAccentStatus(index);
                }} />
            })}
        </div>
    );
}

export default AccentPicker;
