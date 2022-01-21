import { CommentInfo } from "../Comments/Comment";
import { MetronomeSettings } from "../MetronomeSettings/MetronomeSettings";

export interface Playlist {
    id: string,
    name: string,
    isShared: boolean,
    positiveRaitingCount: number,
    negativeRaitingCount: number,
    metronomeSettings: MetronomeSettings[],
    comments: CommentInfo[],
    author: string,
    commentsCount: number,
    created: Date
}
