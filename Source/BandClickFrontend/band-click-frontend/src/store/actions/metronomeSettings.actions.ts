import { Comment } from "../../models/Comments/Comment";
import { Metre } from "../../models/Metre/Metre";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsType } from "../../models/MetronomeSettings/MetronomeSettingsType";

export enum MetronomeSettingsStoreActions {
    LOAD_SETTINGS = 'LOAD_SETTINGS',
    SET_TEMPO = 'SET_TEMPO',
    SET_NAME = 'SET_NAME',
    SET_METRE = 'SET_METRE',
    SET_BEATS_PER_BAR = 'SET_BEATS_PER_BAR',
    SET_RHYTHMIC_UNIT = 'SET_RHYTHMIC_UNIT',
    SET_ACCENTED_BEATS = 'SET_ACCENTED_BEATS',
    ADD_POSITIVE_RAITING = 'ADD_POSITIVE_RAITING',
    ADD_NEGATIVE_RAITING = 'ADD_NEGATIVE_RAITING',
    SUBTRACT_POSITIVE_RAITING = 'SUBTRACT_POSITIVE_RAITING',
    SUBTRACT_NEGATIVE_RAITING = 'SUBTRACT_NEGATIVE_RAITING',
    SET_IS_SHARED = 'SET_IS_SHARED',
    SET_NUMBER_OF_MEASURES = 'SET_NUMBER_OF_MEASURES',
    SET_TYPE = 'SET_TYPE',
    ADD_COMMENT = 'ADD_COMMENT',
    REMOVE_COMMENT = 'REMOVE_COMMENT'
}

export interface LoadSettingsAction {
    type: MetronomeSettingsStoreActions.LOAD_SETTINGS,
    metronomeSettings: MetronomeSettings
}

export interface SetTempoAction {
    type: MetronomeSettingsStoreActions.SET_TEMPO,
    tempo: number
}

export interface SetNameAction {
    type: MetronomeSettingsStoreActions.SET_NAME,
    name: string
}

export interface SetMetreAction {
    type: MetronomeSettingsStoreActions.SET_METRE,
    metre: Metre
}

export interface SetBeatsPerBarAction {
    type: MetronomeSettingsStoreActions.SET_BEATS_PER_BAR,
    beatsPerBar: number
}

export interface SetRhythmicUnitAction {
    type: MetronomeSettingsStoreActions.SET_RHYTHMIC_UNIT,
    rhythmicUnit: number
}

export interface SetAccentedBeatsAction {
    type: MetronomeSettingsStoreActions.SET_ACCENTED_BEATS,
    accentedBeats: number[]
}

export interface AddPositiveRaitingAction {
    type: MetronomeSettingsStoreActions.ADD_POSITIVE_RAITING
}

export interface AddNegativeRaitingAction {
    type: MetronomeSettingsStoreActions.ADD_NEGATIVE_RAITING
}

export interface SubtractPositiveRaitingAction {
    type: MetronomeSettingsStoreActions.SUBTRACT_POSITIVE_RAITING
}

export interface SubtractNegativeRaitingAction {
    type: MetronomeSettingsStoreActions.SUBTRACT_NEGATIVE_RAITING
}

export interface SetIsSharedAction {
    type: MetronomeSettingsStoreActions.SET_IS_SHARED,
    isShared: boolean
}

export interface SetNumberOfMeasuresAction {
    type: MetronomeSettingsStoreActions.SET_NUMBER_OF_MEASURES,
    numberOfMeasures: number
}

export interface SetTypeAction {
    type: MetronomeSettingsStoreActions.SET_TYPE,
    settingsType: MetronomeSettingsType
}

export interface AddCommentAction {
    type: MetronomeSettingsStoreActions.ADD_COMMENT,
    comment: Comment
}

export interface RemoveCommentAction {
    type: MetronomeSettingsStoreActions.REMOVE_COMMENT,
    comment: Comment
}

export type MetronomeSettingsActions = 
    LoadSettingsAction |
    SetTempoAction |
    SetNameAction |
    SetMetreAction |
    SetBeatsPerBarAction |
    SetRhythmicUnitAction |
    SetAccentedBeatsAction |
    AddPositiveRaitingAction |
    AddNegativeRaitingAction |
    SubtractPositiveRaitingAction |
    SubtractNegativeRaitingAction |
    SetIsSharedAction |
    SetNumberOfMeasuresAction |
    SetTypeAction |
    AddCommentAction |
    RemoveCommentAction;

export const metronomeSettingsAction = {
    loadSettings: (metronomeSettings: MetronomeSettings): LoadSettingsAction => ({
        type: MetronomeSettingsStoreActions.LOAD_SETTINGS,
        metronomeSettings: metronomeSettings
    }),
    setTempo: (tempo: number): SetTempoAction => ({
        type: MetronomeSettingsStoreActions.SET_TEMPO,
        tempo: tempo
    }),
    setName: (name: string): SetNameAction => ({
        type: MetronomeSettingsStoreActions.SET_NAME,
        name: name
    }),
    setMetre: (metre: Metre): SetMetreAction => ({
        type: MetronomeSettingsStoreActions.SET_METRE,
        metre: metre
    }),
    setBeatsPerBar: (beatsPerBar: number): SetBeatsPerBarAction => ({
        type: MetronomeSettingsStoreActions.SET_BEATS_PER_BAR,
        beatsPerBar: beatsPerBar
    }),
    setRhythmicUnit: (rhythmicUnit: number): SetRhythmicUnitAction => ({
        type: MetronomeSettingsStoreActions.SET_RHYTHMIC_UNIT,
        rhythmicUnit: rhythmicUnit
    }),
    setAccentedBeats: (accentedBeats: number[]): SetAccentedBeatsAction => ({
        type: MetronomeSettingsStoreActions.SET_ACCENTED_BEATS,
        accentedBeats: accentedBeats
    }),
    addPositiveRaiting: (): AddPositiveRaitingAction => ({
        type: MetronomeSettingsStoreActions.ADD_POSITIVE_RAITING
    }),
    addNegativeRaiting: (): AddNegativeRaitingAction => ({
        type: MetronomeSettingsStoreActions.ADD_NEGATIVE_RAITING
    }),
    subtractPositiveRaiting: (): SubtractPositiveRaitingAction => ({
        type: MetronomeSettingsStoreActions.SUBTRACT_POSITIVE_RAITING
    }),
    subtractNegativeRaiting: (): SubtractNegativeRaitingAction => ({
        type: MetronomeSettingsStoreActions.SUBTRACT_NEGATIVE_RAITING
    }),
    setIsShared: (isShared: boolean): SetIsSharedAction => ({
        type: MetronomeSettingsStoreActions.SET_IS_SHARED,
        isShared: isShared
    }),
    setNumberOfMeasures: (numberOfMeasures: number): SetNumberOfMeasuresAction => ({
        type: MetronomeSettingsStoreActions.SET_NUMBER_OF_MEASURES,
        numberOfMeasures: numberOfMeasures
    }),
    setType: (settingsType: MetronomeSettingsType): SetTypeAction => ({
        type: MetronomeSettingsStoreActions.SET_TYPE,
        settingsType: settingsType
    }),
    addComment: (comment: Comment): AddCommentAction => ({
        type: MetronomeSettingsStoreActions.ADD_COMMENT,
        comment: comment
    }),
    removeComment: (comment: Comment): RemoveCommentAction => ({
        type: MetronomeSettingsStoreActions.REMOVE_COMMENT,
        comment: comment
    })
}
