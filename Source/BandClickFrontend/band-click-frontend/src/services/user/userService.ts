import { User } from "../../models/Auth/User";
import { USER_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const UserService = {
    getUserByEmail: async (email: string): Promise<User> => {
        const result = await requests.get(`${USER_CONTROLLER}/email/${email}`, auth.getToken()) as User;
        return result;
    }
}

export default UserService;