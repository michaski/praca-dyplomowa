import { Playlist } from "../Playlists/Playlist";
import { UserInBandInfo } from "./UserInBandInfo";

export interface Band {
    id: string,
    name: string,
    members: UserInBandInfo[],
    playlists: Playlist[]
}
