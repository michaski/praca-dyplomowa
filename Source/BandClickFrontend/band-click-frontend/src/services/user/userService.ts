import { ChangePassword } from "../../models/Auth/ChangePassword";
import { User } from "../../models/Auth/User";
import { USER_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const UserService = {
    getUserByEmail: async (email: string): Promise<User> => {
        const result = await requests.get(`${USER_CONTROLLER}/email/${email}`, auth.getToken(), undefined, false) as User;
        return result;
    },
    getUserByUsername: async (username: string): Promise<User> => {
        const result = await requests.get(`${USER_CONTROLLER}/username/${username}`, auth.getToken(), undefined, false) as User;
        return result;
    },
    getUserById: async (id: string): Promise<User> => {
        const result = await requests.get(`${USER_CONTROLLER}/id/${id}`, auth.getToken(), undefined, false) as User;
        return result;
    },
    update: async(userData: User) => {
        await requests.put(USER_CONTROLLER, userData, auth.getToken());
    },
    changePassword: async(changePasswordData: ChangePassword) => {
        await requests.put(`${USER_CONTROLLER}/changePassword`, changePasswordData, auth.getToken());
    },
    promoteToAdmin: async(id: string) => {
        await requests.put(`${USER_CONTROLLER}/${id}/promoteToAdmin`, null, auth.getToken());
    },
    demoteToUser: async(id: string) => {
        await requests.put(`${USER_CONTROLLER}/${id}/demoteToUser`, null, auth.getToken());
    },
    deleteUser: async(id: string) => {
        await requests.delete(`${USER_CONTROLLER}/${id}`, null, auth.getToken());
    },
}

export default UserService;