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
    positiveRaitingCouns: 0,
    negativeRaitingCount: 0,
    comments: []
}

export const metronomeSettingsStoreReducer: Reducer<MetronomeSettings, MetronomeSettingsActions> = 
    (state: MetronomeSettings = metronomeSettingsInitialState, actions: MetronomeSettingsActions) => {
        switch (actions.type) {
            case MetronomeSettingsStoreActions.LOAD_SETTINGS:
                return {
                    ...state,
                    ...actions.metronomeSettings
                };
            default:
                return state;
        }
    }
