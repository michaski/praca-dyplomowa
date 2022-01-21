import { Comment } from "../Comments/Comment";
import { Metre } from "../Metre/Metre";
import { MetronomeSettingsType } from "./MetronomeSettingsType";

export interface MetronomeSettings {
    id: string,
    name: string,
    numberOfMeasures: number,
    tempo: number,
    metre: Metre,
    type: MetronomeSettingsType,
    comments: Comment[],
    isShared: boolean,
    positiveRaitingCount: number,
    negativeRaitingCount: number,
    author: string,
    commentsCount: number,
    created: Date
}
