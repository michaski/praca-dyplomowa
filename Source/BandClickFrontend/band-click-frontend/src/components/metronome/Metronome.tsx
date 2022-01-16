import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import metronomeSettingsSelector from "../../store/selectors/metronomeSettings.selector";
import MetronomePlayer from "../../utils/metronome/metronomePlayer";
import AccentPicker from "../accentPicker/AccentPicker";
import NumericInput from "../numericInput/NumericInput";
import SaveSettingsToPlaylist from "../metronomeSettings/SaveSettingsToPlaylist";
import { mapAccentedBeatsToAccentMap, mapAccentMapToAccentedBeats } from "../../utils/metronomeSettings/mapAccents";

interface MetronomeProps {
    settings: MetronomeSettings,
    playlistId?: string,
    onSettingsAdded?: Function,
    onBarFinished: Function,
    isAutoSwitchOn: boolean
}

const Metronome: React.FC<MetronomeProps> = ({settings, playlistId, onSettingsAdded, onBarFinished, isAutoSwitchOn}) => {
    let barCount = useRef(0);

    const handleFinishedBar = () => {
        if (autoSwitchState.current) {
            barCount.current++;
            onBarFinished(barCount.current);
        }
    }

    const DEFAULT_TEMPO = 80;
    const MIN_TEMPO = 20;
    const MAX_TEMPO = 300;
    const DEFAULT_BEATS_PER_BAR = 4;
    const DEFAULT_RHYTHMIC_UNIT = 4;
    const metronomeSettings = useSelector(metronomeSettingsSelector.getSettings);
    const metronomeSettingsActions = useAction(MetronomeSettingsStoreSerivce);
    const [tempo, setTempo] = useState(metronomeSettings.tempo);
    const [beatsPerBar, setBeatsPerBar] = useState(metronomeSettings.metre.beatsPerBar);
    const [rhythmicUnit, setRhythmicUnit] = useState(metronomeSettings.metre.rhythmicUnit);
    const [accentMap, setAccentMap] = useState([] as boolean[]);
    let autoSwitchState = useRef(isAutoSwitchOn);
    const metronome = useRef(new MetronomePlayer(tempo, beatsPerBar, [], handleFinishedBar));

    useEffect(() => {
        autoSwitchState.current = isAutoSwitchOn;
        barCount.current = 0;
        handleTempoChange(metronomeSettings.tempo);
        handleBeatsPerBarChange(metronomeSettings.metre.beatsPerBar);
        const newAccentMap = mapAccentedBeatsToAccentMap(metronomeSettings.metre.accentedBeats, metronomeSettings.metre.beatsPerBar);
        handleAccentPatternChange(newAccentMap);
        handleRhythmicUnitChange(metronomeSettings.metre.rhythmicUnit);
    }, [settings, isAutoSwitchOn]);

    const handleTempoChange = (newTempo: number) => {
        if (isNaN(newTempo) || newTempo === Infinity || newTempo < MIN_TEMPO || newTempo > MAX_TEMPO) {
            return;
        }
        metronome.current.setTempo(newTempo);
        setTempo(newTempo);
        metronomeSettingsActions.setTempo(newTempo);
    }

    const handleBeatsPerBarChange = (newBeatsPerBar: number) => {
        let newAccentMap: boolean[] = [];
        if (newBeatsPerBar < accentMap.length) {
            newAccentMap = accentMap.slice(0, beatsPerBar);
        } else {
            newAccentMap = Array.from(accentMap);
            for (let i = accentMap.length; i < newBeatsPerBar; i++) {
                 newAccentMap[i] = false;
            }
        }
        setAccentMap(newAccentMap);
        setBeatsPerBar(newBeatsPerBar);
        metronomeSettingsActions.setBeatsPerBar(newBeatsPerBar);
        metronome.current.setAccentsFromAccentMap(newAccentMap);
    }

    const handleMetreRhythmicUnitChange = (newRhythmicUnit: number) => {
        setRhythmicUnit(newRhythmicUnit);
        metronomeSettingsActions.setRhythmicUnit(newRhythmicUnit);
    }

    const handleAccentPatternChange = (newAccentMap: boolean[]) => {
        setAccentMap(newAccentMap);
        metronome.current.setAccentsFromAccentMap(newAccentMap);
        const accentedBeats = mapAccentMapToAccentedBeats(newAccentMap);
        metronomeSettingsActions.setAccentedBeats(accentedBeats);
    }
    
    const handleRhythmicUnitChange = (rhythmicUnit: number) => {
        setRhythmicUnit(rhythmicUnit);
        metronomeSettingsActions.setRhythmicUnit(rhythmicUnit);
    }

    const toggleMetronome = () => {
        if (!metronome.current.getIsRunning()) {
            barCount.current = 0;
            metronome.current.start();
        } else {
            metronome.current.stop();
        }
    }

    return (
        <div className="col-md-8">
            <NumericInput value={metronomeSettings.tempo} minValue={MIN_TEMPO} maxValue={MAX_TEMPO} step={1} onValueChange={handleTempoChange} />
            <div>
                <button className="btn btn-outline-dark" onClick={toggleMetronome}>Start</button>
            </div>
            <div>
                <h2>Metrum</h2>
                <NumericInput value={metronomeSettings.metre.beatsPerBar} minValue={1} maxValue={32} step={1} onValueChange={handleBeatsPerBarChange} />
                <NumericInput value={metronomeSettings.metre.rhythmicUnit} minValue={4} maxValue={16} step={4} onValueChange={handleMetreRhythmicUnitChange} />
            </div>
            <AccentPicker accentedBeats={accentMap} beatsPerBar={metronomeSettings.metre.beatsPerBar} onAccentPatternChange={handleAccentPatternChange} />
            {
                playlistId !== null && playlistId !== undefined &&
                    <SaveSettingsToPlaylist 
                        onSettingsAdded={() => {
                            if (onSettingsAdded) {
                                onSettingsAdded();
                            }
                        }
                    } />
            }
        </div>
    );
}

export { Metronome };
