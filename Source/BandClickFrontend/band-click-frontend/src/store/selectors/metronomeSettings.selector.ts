import { createSelector } from "reselect";
import { StoreState } from "../store";

const metronomeSettingsSelector = {
    getSettings: createSelector(
        (state: StoreState) => state.metronomeSettings,
        metronomeSettings => metronomeSettings
    ),
    getId: createSelector(
        (state: StoreState) => state.metronomeSettings,
        id => id.id
    ),
    getName: createSelector(
        (state: StoreState) => state.metronomeSettings,
        name => name.name
    ),
    getTempo: createSelector(
        (state: StoreState) => state.metronomeSettings,
        tempo => tempo.tempo
    ),
    getBeatsPerBar: createSelector(
        (state: StoreState) => state.metronomeSettings,
        beatsPerBar => beatsPerBar.metre.beatsPerBar
    ),
    getRhythmicUnit: createSelector(
        (state: StoreState) => state.metronomeSettings,
        rhythmicUnit => rhythmicUnit.metre.rhythmicUnit
    ),
    getAccentedBeats: createSelector(
        (state: StoreState) => state.metronomeSettings,
        accentedBeats => accentedBeats.metre.accentedBeats
    ),
    getType: createSelector(
        (state: StoreState) => state.metronomeSettings,
        type => type.type
    ),
    getIsShared: createSelector(
        (state: StoreState) => state.metronomeSettings,
        isShared => isShared.isShared
    ),
    getMetre: createSelector(
        (state: StoreState) => state.metronomeSettings,
        metre => metre.metre
    ),
    getComments: createSelector(
        (state: StoreState) => state.metronomeSettings,
        comments => comments.comments
    ),
    getPositiveRaitingCount: createSelector(
        (state: StoreState) => state.metronomeSettings,
        positiveRaitingCount => positiveRaitingCount.positiveRaitingCount
    ),
    getNegativeRaitingCount: createSelector(
        (state: StoreState) => state.metronomeSettings,
        negativeRaitingCount => negativeRaitingCount.negativeRaitingCount
    ),
    getNumberOfMeasures: createSelector(
        (state: StoreState) => state.metronomeSettings,
        numberOfMeasures => numberOfMeasures.numberOfMeasures
    )
}

export default metronomeSettingsSelector;
