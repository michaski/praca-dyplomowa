import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import store from "../../store";
import { metronomeSettingsAction } from "../../store/actions/metronomeSettings.actions";

export class MetronomeSettingsStoreSerivce {
    loadSettings(settings: MetronomeSettings) {
        store.dispatch(metronomeSettingsAction.loadSettings(settings));
    }
}
