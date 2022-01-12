import { METRONOME_SOUND_ACCENT, METRONOME_SOUND_REGULAR } from "../apiUrls";
import MetronomeTimer from "./metronomeTimer";

class MetronomePlayer {
    private accentSound = new Audio(METRONOME_SOUND_ACCENT);
    private regularSound = new Audio(METRONOME_SOUND_REGULAR);
    private soundArray: HTMLAudioElement[] = [];
    private clickIntervalArray: number[] = [];
    private tempo: number = 80;
    private beatsPerBar = 4;
    private rhythmicUnit = 4;
    private clickIndex = 0;
    private clickIntervalId: number = 0;
    private clickTimeoutId: number = 0;
    private clickIntervalLength: number = 0;
    private lastClickTime: number = 0;
    private isRunning: boolean = false;
    private clickInterval: any;
    private timer: MetronomeTimer = new MetronomeTimer();

    constructor(tempo: number = 80, beatsPerBar: number = 4, accentedBeats: number[] = []) {
        this.setTempo(tempo);
        this.beatsPerBar = beatsPerBar;
        this.setAccents(accentedBeats);
    }

    public setAccents = (accentedBeats: number[]) => {
        this.soundArray = new Array<HTMLAudioElement>(this.beatsPerBar);
        this.soundArray.fill(this.regularSound);
        accentedBeats.forEach(accentedBeat => {
            this.soundArray[accentedBeat - 1] = this.accentSound;
        });
    }

    public setTempo = (newTempo: number) => {
        this.tempo = newTempo;
        this.calculateInterval();
        if (this.isRunning) {
            this.restart();
        }
    }

    public start = () => {
        this.isRunning = true;
        this.timer.setInterval(this.click, this.clickIntervalLength, this);
    }

    public stop = () => {
        this.timer.clearInterval();
        this.clickIndex = 0;
        this.isRunning = false;
    }

    private click = () => {
        if (this.clickIndex === this.beatsPerBar - 1) {
            this.clickIndex = 0;
        } else {
            this.clickIndex++;
        }
    }

    public getIsRunning = (): boolean => this.isRunning;

    private restart = () => {
        this.stop();
        this.start();
    }

    private calculateInterval = () => {
        this.clickIntervalLength = 60.0 / this.tempo * 1000;
    }
}

export default MetronomePlayer;
