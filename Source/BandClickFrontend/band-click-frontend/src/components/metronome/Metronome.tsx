import React, { useState } from "react";
import { METRONOME_SOUND_ACCENT, METRONOME_SOUND_REGULAR } from "../../utils/apiUrls";
import MetronomePlayer from "../../utils/metronome/metronomePlayer";
import AccentPicker from "../accentPicker/AccentPicker";
import NumericInput from "../numericInput/NumericInput";

const Metronome = () => {
    const DEFAULT_TEMPO = 80;
    const MIN_TEMPO = 20;
    const MAX_TEMPO = 500;
    const DEFAULT_BEATS_PER_BAR = 4;
    const DEFAULT_RHYTHMIC_UNIT = 4;
    const accentSound = new Audio(METRONOME_SOUND_ACCENT);
    const regularSound = new Audio(METRONOME_SOUND_REGULAR);
    let tempo = DEFAULT_TEMPO;
    let beatsPerBar = DEFAULT_BEATS_PER_BAR;
    let rhythmicUnit = DEFAULT_RHYTHMIC_UNIT;
    const metronome: MetronomePlayer = new MetronomePlayer(tempo, beatsPerBar);

    const handleTempoChange = (newTempo: number) => {
        if (isNaN(newTempo) || newTempo === Infinity || newTempo < MIN_TEMPO || newTempo > MAX_TEMPO) {
            return;
        }
        metronome.setTempo(newTempo);
    }

    const handleBeatsPerBarChange = (newBeatsPerBar: number) => {
        beatsPerBar = newBeatsPerBar;
    }

    const handleMetreRhythmicUnitChange = (newRhythmicUnit: number) => {
        rhythmicUnit = newRhythmicUnit;
    }

    const handleAccentPatternChange = (accentMap: boolean[]) => {

    }

    const toggleMetronome = () => {
        if (!metronome.getIsRunning()) {
            metronome.start();
        } else {
            metronome.stop();
        }
    }

    return (
        <div className="col-md-8">
            <NumericInput defaultValue={DEFAULT_TEMPO} minValue={MIN_TEMPO} maxValue={MAX_TEMPO} step={1} onValueChange={handleTempoChange} />
            <div>
                <button className="btn btn-outline-dark" onClick={toggleMetronome}>Start</button>
            </div>
            <div>
                <h2>Metrum</h2>
                <NumericInput defaultValue={DEFAULT_BEATS_PER_BAR} minValue={1} maxValue={32} step={1} onValueChange={handleBeatsPerBarChange} />
                <NumericInput defaultValue={DEFAULT_RHYTHMIC_UNIT} minValue={4} maxValue={16} step={4} onValueChange={handleMetreRhythmicUnitChange} />
            </div>
            <AccentPicker beatsPerBar={beatsPerBar} onAccentPatternChange={handleAccentPatternChange} />
        </div>
    );
}

export { Metronome };
