import { Comment } from "../../models/Comments/Comment";
import { Metre } from "../../models/Metre/Metre";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsType } from "../../models/MetronomeSettings/MetronomeSettingsType";
import store from "../../store";
import { metronomeSettingsAction } from "../../store/actions/metronomeSettings.actions";

export class MetronomeSettingsStoreSerivce {
    loadSettings(settings: MetronomeSettings) {
        store.dispatch(metronomeSettingsAction.loadSettings(settings));
    }
    setTempo(tempo: number) {
        store.dispatch(metronomeSettingsAction.setTempo(tempo));
    }
    setName(name: string) {
        store.dispatch(metronomeSettingsAction.setName(name));
    }
    setMetre(metre: Metre) {
        store.dispatch(metronomeSettingsAction.setMetre(metre));
    }
    setBeatsPerBar(beatsPerBar: number) {
        store.dispatch(metronomeSettingsAction.setBeatsPerBar(beatsPerBar));
    }
    setRhythmicUnit(rhythmicUnit: number) {
        store.dispatch(metronomeSettingsAction.setRhythmicUnit(rhythmicUnit));
    }
    setAccentedBeats(accentedBeats: number[]) {
        store.dispatch(metronomeSettingsAction.setAccentedBeats(accentedBeats));
    }
    addPositiveRaiting() {
        store.dispatch(metronomeSettingsAction.addPositiveRaiting());
    }
    addNegativeRaiting() {
        store.dispatch(metronomeSettingsAction.addNegativeRaiting());
    }
    subtractPositiveRaiting() {
        store.dispatch(metronomeSettingsAction.subtractPositiveRaiting());
    }
    subtractNegativeRaiting() {
        store.dispatch(metronomeSettingsAction.subtractNegativeRaiting());
    }
    setIsShared(isShared: boolean) {
        store.dispatch(metronomeSettingsAction.setIsShared(isShared));
    }
    setNumberOfMeasures(numberOfMeasures: number) {
        store.dispatch(metronomeSettingsAction.setNumberOfMeasures(numberOfMeasures));
    }
    setType(settingsType: MetronomeSettingsType) {
        store.dispatch(metronomeSettingsAction.setType(settingsType));
    }
    addComment(comment: Comment) {
        store.dispatch(metronomeSettingsAction.addComment(comment));
    }
    removeComment(comment: Comment) {
        store.dispatch(metronomeSettingsAction.removeComment(comment));
    }
}
