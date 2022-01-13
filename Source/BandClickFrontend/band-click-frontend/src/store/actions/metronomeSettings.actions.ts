import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";

export enum MetronomeSettingsStoreActions {
    LOAD_SETTINGS = 'LOAD_SETTINGS',
    SET_TEMPO = 'SET_TEMPO',
    SET_BEATS_PER_BAR = 'BEATS_PER_BAR',
    
}

export interface LoadSettingsAction {
    type: MetronomeSettingsStoreActions.LOAD_SETTINGS,
    metronomeSettings: MetronomeSettings
}

export type MetronomeSettingsActions = LoadSettingsAction;

export const metronomeSettingsAction = {
    loadSettings: (metronomeSettings: MetronomeSettings): LoadSettingsAction => ({
        type: MetronomeSettingsStoreActions.LOAD_SETTINGS,
        metronomeSettings: metronomeSettings
    })
}
