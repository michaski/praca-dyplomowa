import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import metronomeSettingsSelector from "../../store/selectors/metronomeSettings.selector";
import MetronomePlayer from "../../utils/metronome/metronomePlayer";
import AccentPicker from "../accentPicker/AccentPicker";
import NumericInput from "../numericInput/NumericInput";

interface MetronomeProps {
    settings: MetronomeSettings
}

const Metronome: React.FC<MetronomeProps> = ({settings}) => {
    const DEFAULT_TEMPO = 80;
    const MIN_TEMPO = 20;
    const MAX_TEMPO = 500;
    const DEFAULT_BEATS_PER_BAR = 4;
    const DEFAULT_RHYTHMIC_UNIT = 4;
    const [tempo, setTempo] = useState(settings.tempo);
    const [beatsPerBar, setBeatsPerBar] = useState(settings.metre.beatsPerBar);
    const [rhythmicUnit, setRhythmicUnit] = useState(settings.metre.rhythmicUnit);
    const [accentMap, setAccentMap] = useState([] as boolean[]);
    const metronome = useRef(new MetronomePlayer(tempo, beatsPerBar));
    // const metronomeSettings = useSelector(metronomeSettingsSelector.getSettings);
    // const metronomeSettingsActions = useAction(MetronomeSettingsStoreSerivce);

    useEffect(() => {
        metronome.current.setTempo(settings.tempo);
        const newAccentMap = mapAccentedBeatsToAccentMap();
        metronome.current.setAccentsFromAccentMap(newAccentMap);
        setAccentMap(newAccentMap);
        setTempo(settings.tempo);
        setBeatsPerBar(settings.metre.beatsPerBar);
        setRhythmicUnit(settings.metre.rhythmicUnit);
    }, [settings]);

    const mapAccentedBeatsToAccentMap = (): boolean[] => {
        let newMap: boolean[] = [];
        for (let i = 0; i<settings.metre.beatsPerBar; i++) {
            newMap[i] = settings.metre.accentedBeats?.includes(i + 1) || false;
        }
        return newMap;
    }

    const handleTempoChange = (newTempo: number) => {
        if (isNaN(newTempo) || newTempo === Infinity || newTempo < MIN_TEMPO || newTempo > MAX_TEMPO) {
            return;
        }
        metronome.current.setTempo(newTempo);
        setTempo(newTempo);
    }

    const handleBeatsPerBarChange = (newBeatsPerBar: number) => {
        setBeatsPerBar(newBeatsPerBar);
    }

    const handleMetreRhythmicUnitChange = (newRhythmicUnit: number) => {
        setRhythmicUnit(newRhythmicUnit);
    }

    const handleAccentPatternChange = (accentMap: boolean[]) => {
        metronome.current.setAccentsFromAccentMap(accentMap);
    }

    const toggleMetronome = () => {
        if (!metronome.current.getIsRunning()) {
            metronome.current.start();
        } else {
            metronome.current.stop();
        }
    }

    return (
        <div className="col-md-8">
            <NumericInput value={tempo} minValue={MIN_TEMPO} maxValue={MAX_TEMPO} step={1} onValueChange={handleTempoChange} />
            <div>
                <button className="btn btn-outline-dark" onClick={toggleMetronome}>Start</button>
            </div>
            <div>
                <h2>Metrum</h2>
                <NumericInput value={beatsPerBar} minValue={1} maxValue={32} step={1} onValueChange={handleBeatsPerBarChange} />
                <NumericInput value={rhythmicUnit} minValue={4} maxValue={16} step={4} onValueChange={handleMetreRhythmicUnitChange} />
            </div>
            <AccentPicker accentedBeats={accentMap} beatsPerBar={beatsPerBar} onAccentPatternChange={handleAccentPatternChange} />
        </div>
    );
}

export { Metronome };
