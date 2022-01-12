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
    let soundArray: HTMLAudioElement[];
    let clickIntervalArray: number[];
    let tempo = DEFAULT_TEMPO;
    let beatsPerBar = DEFAULT_BEATS_PER_BAR;
    let rhythmicUnit = DEFAULT_RHYTHMIC_UNIT;
    let clickIndex = 0;
    let clickIntervalId: number;
    let lastClickTime: number;
    const metronome: MetronomePlayer = new MetronomePlayer(tempo, beatsPerBar);
    console.log(metronome);

    const calculateClickInterval = (desiredTempo: number): number => {
        return 60.0 / desiredTempo * 1000;
    }

    let clickInterval = calculateClickInterval(DEFAULT_TEMPO);
    let isRunning: boolean = false;
    let clickTimeout: number;    

    const handleTempoChange = (newTempo: number) => {
        if (isNaN(newTempo) || newTempo === Infinity || newTempo < MIN_TEMPO || newTempo > MAX_TEMPO) {
            return;
        }
        metronome.setTempo(newTempo);
        // tempo = newTempo;
        // clickInterval = calculateClickInterval(newTempo);
        // if (isRunning) {
        //     clearInterval(clickIntervalId);
        //     clickIntervalId = setInterval(click, clickInterval, clickIndex);
        //     console.log(clickInterval);
        // }
    }

    const handleBeatsPerBarChange = (newBeatsPerBar: number) => {
        beatsPerBar = newBeatsPerBar;
    }

    const handleMetreRhythmicUnitChange = (newRhythmicUnit: number) => {
        rhythmicUnit = newRhythmicUnit;
    }

    const handleAccentPatternChange = (accentMap: boolean[]) => {

    }

    const prepareSoundArray = () => {
        soundArray = [];
        soundArray.push(accentSound);
        soundArray.push(regularSound);
        soundArray.push(regularSound);
        soundArray.push(regularSound);
    }

    const testLatency = (): number[] => {
        let latencyTable: number[] = [];
        for (let i=0; i<soundArray.length; i++) {
            soundArray[i].muted = true;
            const startTime = Date.now();
            click(0);
            const endTime = Date.now();
            clearTimeout(clickTimeout);
            soundArray[i].muted = false;
            const timeElapsed = endTime - startTime;
            latencyTable.push(timeElapsed);
        }
        clickIndex = 0;
        console.log(latencyTable);
        return latencyTable;
    }

    const toggleMetronome = () => {
        if (!metronome.getIsRunning()) {
            metronome.start();
        } else {
            metronome.stop();
        }
        // if (!isRunning) {
        //     prepareSoundArray();
        //     // clickIntervalArray = testLatency();
        //     isRunning = true;
        //     clickIntervalId = setInterval(click, clickInterval, clickIndex);
        //     // lastClickTime = Date.now();
        //     // click(0);
        // } else {
        //     // clearTimeout(clickTimeout);
        //     clearInterval(clickIntervalId);
        //     isRunning = false;
        //     clickIndex = 0;
        // }
    }

    const click = (index: number) => {
        // const newClickTime = Date.now();
        soundArray[clickIndex].play();
        if (clickIndex === beatsPerBar - 1) {
            clickIndex = 0;
        } else {
            clickIndex++;
        }
        // let latency = clickInterval - (newClickTime - lastClickTime);
        // console.log(newClickTime - lastClickTime);
        // clickTimeout = setTimeout(click, clickInterval - latency, clickIndex);
        // lastClickTime = newClickTime;
        // let timeout = clickInterval - soundArray[index].duration;
        // clickTimeout = setTimeout(click, timeout, index);
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
