import { MetronomeSettings } from "./MetronomeSettings";

export interface PagedMetronomeSettings {
    items: MetronomeSettings[],
    totalPages: number,
    itemsFrom: number,
    itemsTo: number,
    totalItemsCount: number
}
