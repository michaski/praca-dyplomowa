import { Token } from "../../models/Auth/Token";
import { AUTH_LOGIN } from "../../utils/apiUrls";
import Requests from "../../utils/requests/requests";

const LoginService = {
    login: async (email: string, password: string) => {
        const requests = new Requests();
        const response = await requests.post(AUTH_LOGIN, {email: email, password: password}) as Token;
        localStorage.setItem('jwt', response.token);
    },
    logout: () => {
        localStorage.removeItem('jwt');
    }
}

export default LoginService;
