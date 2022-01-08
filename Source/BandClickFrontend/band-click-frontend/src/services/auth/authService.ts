import { User } from "../../models/Auth/User";
import store from "../../store";
import { authAction } from "../../store/actions/auth.actions";

export class AuthService {
    setUser(user: User) {
        store.dispatch(authAction.setUser(user));
    }
    removeUser() {
        store.dispatch(authAction.removeUser());
    }
}