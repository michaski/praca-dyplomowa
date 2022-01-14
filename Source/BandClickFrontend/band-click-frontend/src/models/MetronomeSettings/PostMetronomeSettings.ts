import { PostMetre } from "../Metre/PostMetre";

export interface PostMetronomeSettings {
    name: string,
    numberOfMeasures: number,
    tempo: number,
    metre: PostMetre,
    typeId: string,
    playlistId: string
}
