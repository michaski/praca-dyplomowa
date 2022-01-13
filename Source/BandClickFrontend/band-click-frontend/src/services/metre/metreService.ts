import { Metre } from "../../models/Metre/Metre";
import { METRE_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const MetreService = {
    updateMetre: async (metre: Metre) => {
        await requests.put(METRE_CONTROLLER, metre, auth.getToken());
    }
}

export default MetreService;
