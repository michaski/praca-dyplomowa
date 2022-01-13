import { createSelector } from "reselect";
import { StoreState } from "../store";

const metronomeSettingsSelector = {
    getSettings: createSelector(
        (state: StoreState) => state.metronomeSettings,
        metronomeSettings => metronomeSettings
    )
}

export default metronomeSettingsSelector;
