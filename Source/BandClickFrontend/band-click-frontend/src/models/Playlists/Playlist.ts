import { Comment } from "../Comments/Comment";
import { MetronomeSettings } from "../MetronomeSettings/MetronomeSettings";

export interface Playlist {
    id: string,
    name: string,
    isShared: boolean,
    positiveRaitingCount: number,
    negativeRaitingCount: number,
    metronomeSettings: MetronomeSettings[],
    comments: Comment[]
}
