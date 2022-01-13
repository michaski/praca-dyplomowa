import { Comment } from "../Comments/Comment";
import { MetronomeSettings } from "../MetronomeSettings/MetronomeSettings";

export interface Playlist {
    id: string,
    name: string,
    positiveRaitingCount: number,
    negativeRaitingCount: number,
    metronomeSettings: MetronomeSettings[],
    comments: Comment[]
}
