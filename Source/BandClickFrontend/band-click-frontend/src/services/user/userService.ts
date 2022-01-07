import { User } from "../../models/Auth/User";
import { USER_CONTROLLER } from "../../utils/apiUrls";
import Requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const UserService = {
    getUserByEmail: async (email: string): Promise<User> => {
        const requests = new Requests();
        const result = await requests.get(`${USER_CONTROLLER}/email/${email}`, null, auth.getToken()) as User;
        return result;
    }
}

export default UserService;