import { User } from "../../models/Auth/User";
import store from "../../store";
import { authAction } from "../../store/actions/auth.actions";
import UserService from "../user/userService";
import LoginService from "./loginService";

class Auth {
    login = async (email: string, password: string) => {
        const isLoggedIn = await LoginService.login(email, password);
        if (isLoggedIn) {
            const user = await UserService.getUserByEmail(email) as User;
            store.dispatch(authAction.setUser(user));
        }
    }

    logout = async () => {
        await LoginService.logout();
        store.dispatch(authAction.removeUser());
    }

    getToken = (): string => {
        return localStorage.getItem('jwt') || '';
    }

    getUser = (): User => {
        return {
            id: '',
            username: '',
            email: '',
            systemRole: ''
        }
    }
}

export default new Auth();
