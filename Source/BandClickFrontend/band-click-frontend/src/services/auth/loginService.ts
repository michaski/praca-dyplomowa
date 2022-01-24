import { Token } from "../../models/Auth/Token";
import { AUTH_LOGIN, AUTH_REGISTER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import { RegisterUser } from "../../models/Auth/RegisterUser";

const LoginService = {
    login: async (email: string, password: string, onError?: Function) => {
        const response = await requests.post(AUTH_LOGIN, {email: email, password: password}, '', onError) as Token;
        if (response == null) {
            // alert("Login failed");
            return false;
        }
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('email', email);
        return true;
    },
    logout: () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('email');
    },
    register: async (userInfo: RegisterUser) => {
        const response = await requests.post(AUTH_REGISTER, userInfo);
        if (response == null) {
            // alert("Register failed");
            return false;
        }
        return true;
    }
}

export default LoginService;
