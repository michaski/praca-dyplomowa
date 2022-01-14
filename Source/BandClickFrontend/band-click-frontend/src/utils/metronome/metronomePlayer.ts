import { METRONOME_SOUND_ACCENT, METRONOME_SOUND_REGULAR } from "../apiUrls";
import MetronomeTimer from "./metronomeTimer";

class MetronomePlayer {
    private accentSound = new Audio(METRONOME_SOUND_ACCENT);
    private regularSound = new Audio(METRONOME_SOUND_REGULAR);
    private soundArray: HTMLAudioElement[] = [];
    private tempo: number = 80;
    private beatsPerBar = 4;
    private clickIndex = 0;
    private clickIntervalLength: number = 0;
    private isRunning: boolean = false;
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
        this.beatsPerBar = accentedBeats.length;
    }

    public setAccentsFromAccentMap = (accentedBeats: boolean[]) => {
        this.soundArray = new Array<HTMLAudioElement>(this.beatsPerBar);
        accentedBeats.forEach((accentedBeat, index) => {
            this.soundArray[index] = accentedBeat ? this.accentSound : this.regularSound;
        });
        this.beatsPerBar = accentedBeats.length;
        console.log(`Updated beats per bar to ${this.beatsPerBar}`);
        console.log(`Updated accent map to `);
        console.log(accentedBeats);
    }

    public setTempo = (newTempo: number) => {
        this.tempo = newTempo;
        this.calculateInterval();
        if (this.isRunning) {
            this.restart();
        }
        console.log(`Updated tempo to ${this.tempo} Bpm`);
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
        this.soundArray[this.clickIndex].play();
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
