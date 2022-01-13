import { Metre } from "../Metre/Metre";

export interface PostMetronomeSettings {
    name: string,
    numberOfMeasures: string,
    tempo: number,
    metre: Metre,
    typeId: string,
    playlistId: string
}
