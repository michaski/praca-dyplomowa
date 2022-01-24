import { RegisterUser } from "../../models/Auth/RegisterUser";
import { User } from "../../models/Auth/User";
import store from "../../store";
import { authAction } from "../../store/actions/auth.actions";
import { metronomeSettingsAction } from "../../store/actions/metronomeSettings.actions";
import { playlistAction } from "../../store/actions/playlists.actions";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";
import UserService from "../user/userService";
import LoginService from "./loginService";

const auth = {
    login: async (email: string, password: string) => {
        const isLoggedIn = await LoginService.login(email, password);
        if (isLoggedIn) {
            const user = await UserService.getUserByEmail(email) as User;
            store.dispatch(authAction.setUser(user));
            localStorage.setItem('email', email);
        }
    },

    logout: async () => {
        await LoginService.logout();
        store.dispatch(authAction.removeUser());
        store.dispatch(playlistAction.deleteAllPlaylists());
        store.dispatch(metronomeSettingsAction.loadSettings(metronomeSettingsInitialState));
    },

    register: async (userInfo: RegisterUser) => {
        const registerSucceeded = await LoginService.register(userInfo);
        return registerSucceeded;
    },

    getToken: (): string => {
        return localStorage.getItem('jwt') || '';
    },

    getUser: (): User => {
        return {
            id: '',
            username: '',
            email: '',
            systemRole: ''
        }
    },
    
    refreshUser: async () => {
        const email = localStorage.getItem('email');
        if (!email) {
            return;
        }
        const user = await UserService.getUserByEmail(email) as User;
        store.dispatch(authAction.setUser(user));
    }
}

export default auth;
