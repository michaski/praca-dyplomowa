import React, { useState } from "react";

interface AccentPickerProps {
    beatsPerBar: number,
    onAccentPatternChange: Function
}

const AccentPicker: React.FC<AccentPickerProps> = ({beatsPerBar, onAccentPatternChange}) => {
    const [beatsCount, setBeatsCount] = useState(beatsPerBar);
    const [accentMap, setAccentMap] = useState([] as boolean[]);

    if (beatsPerBar != accentMap.length) {
        if (beatsPerBar < accentMap.length) {
            setAccentMap(accentMap.slice(0, beatsPerBar - 1));
        } else {
            //setAccentMap(accentMap.fill(false, accentMap.length - 1, beatsPerBar - 1));
        }
    }

    const toggleAccentStatus = (accentIndex: number) => {
        var modifiedAccentMap = accentMap;
        modifiedAccentMap[accentIndex] = !modifiedAccentMap[accentIndex];
        setAccentMap(modifiedAccentMap);
        onAccentPatternChange(accentMap);
    }
    
    return (
        <div>
            {
            accentMap.map((isAccented, index) => {
                return <button key={index} className={(isAccented) ? 'btn btn-dark text-ligth' : 'btn btn-outline-dark text-dark'} onClick={e => toggleAccentStatus(index)}>{index + 1}</button>
            })}
        </div>
    );
}

export default AccentPicker;
