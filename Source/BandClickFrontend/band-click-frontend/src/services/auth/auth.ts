import { User } from "../../models/Auth/User";
import UserService from "../user/userService";
import LoginService from "./loginService";

class Auth {
    isLoggedIn: boolean;
    user: User;

    constructor() {
        this.isLoggedIn = false;
        this.user = {
            id: "",
            email: "",
            userName: "",
            systemRole: ""
        };
    }

    login = async (email: string, password: string) => {
        this.isLoggedIn = await LoginService.login(email, password);
        if (this.isLoggedIn) {
            this.user = await UserService.getUserByEmail(email);
        }
    }

    logout = () => {
        LoginService.logout();
        this.isLoggedIn = false;
        this.user = {
            id: "",
            email: "",
            userName: "",
            systemRole: ""
        };
    }

    getToken = (): string => {
        return localStorage.getItem('jwt') || '';
    }

    isUserLoggedIn = (): boolean => {
        return this.isLoggedIn;
    }
}

export default new Auth();
