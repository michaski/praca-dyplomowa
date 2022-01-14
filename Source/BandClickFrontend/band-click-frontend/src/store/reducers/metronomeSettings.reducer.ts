import { Reducer } from "react";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsActions, MetronomeSettingsStoreActions } from "../actions/metronomeSettings.actions";

export const metronomeSettingsInitialState: MetronomeSettings = {
    id: '',
    name: '',
    tempo: 80,
    metre: {
        id: '',
        beatsPerBar: 4,
        rhythmicUnit: 4,
        accentedBeats: []
    },
    numberOfMeasures: 4,
    type: {
        id: '',
        name: 'Song'
    },
    isShared: false,
    positiveRaitingCount: 0,
    negativeRaitingCount: 0,
    comments: []
}

export const metronomeSettingsStoreReducer: Reducer<MetronomeSettings, MetronomeSettingsActions> = 
    (state: MetronomeSettings = metronomeSettingsInitialState, actions: MetronomeSettingsActions) => {
        let currentState = state;
        switch (actions.type) {
            case MetronomeSettingsStoreActions.LOAD_SETTINGS:
                return {
                    ...actions.metronomeSettings
                };
            case MetronomeSettingsStoreActions.SET_NAME:
                currentState.name = actions.name;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_TEMPO:
                currentState.tempo = actions.tempo;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_METRE:
                currentState.metre = actions.metre;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_BEATS_PER_BAR:
                currentState.metre.beatsPerBar = actions.beatsPerBar;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_RHYTHMIC_UNIT:
                currentState.metre.rhythmicUnit = actions.rhythmicUnit;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_ACCENTED_BEATS:
                currentState.metre.accentedBeats = actions.accentedBeats;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_NUMBER_OF_MEASURES:
                currentState.numberOfMeasures = actions.numberOfMeasures;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_TYPE:
                currentState.type = actions.settingsType;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SET_IS_SHARED:
                currentState.isShared = actions.isShared;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.ADD_POSITIVE_RAITING:
                currentState.positiveRaitingCount = state.positiveRaitingCount + 1;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.ADD_NEGATIVE_RAITING:
                currentState.negativeRaitingCount = state.negativeRaitingCount + 1;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SUBTRACT_POSITIVE_RAITING:
                currentState.positiveRaitingCount = state.positiveRaitingCount - 1;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.SUBTRACT_NEGATIVE_RAITING:
                currentState.negativeRaitingCount = state.negativeRaitingCount - 1;
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.ADD_COMMENT:
                currentState.comments.push(actions.comment);
                return {
                    ...currentState
                };
            case MetronomeSettingsStoreActions.REMOVE_COMMENT:
                currentState.comments = state.comments.filter(c => c.id !== actions.comment.id);
                return {
                    ...currentState 
                };
            default:
                return state;
        }
    }
