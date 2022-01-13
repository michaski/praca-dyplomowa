import React, { useEffect, useState } from "react";

interface AccentPickerProps {
    beatsPerBar: number,
    accentedBeats?: boolean[],
    onAccentPatternChange: Function
}

const AccentPicker: React.FC<AccentPickerProps> = ({beatsPerBar, accentedBeats, onAccentPatternChange}) => {
    const [accentMap, setAccentMap] = useState([] as boolean[]);

    useEffect(() => {
        if (accentedBeats) {
            setAccentMap(accentedBeats);
        }
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
