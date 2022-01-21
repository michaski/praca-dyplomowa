import { Playlist } from "./Playlist";

export interface PagedPlaylists {
    items: Playlist[],
    totalPages: number,
    itemsFrom: number,
    itemsTo: number,
    totalItemsCount: number
}
