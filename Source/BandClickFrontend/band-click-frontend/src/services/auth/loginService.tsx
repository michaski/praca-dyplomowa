import { AUTH_LOGIN, METRONOME_SOUND_ACCENT } from "../../utils/apiUrls";
import http from "../../utils/requests/http";
import useGet from "../../utils/requests/useGet";
import useRequestErrorHandler from "../../utils/requests/useRequestErrorHandler";

const LoginService = {
    login: async (email: string, password: string) => {
        try {
            const response = await http.post(AUTH_LOGIN, {email: email, password: password});
            if (response) {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    },
    logout: () => {

    }
}

export default LoginService;
