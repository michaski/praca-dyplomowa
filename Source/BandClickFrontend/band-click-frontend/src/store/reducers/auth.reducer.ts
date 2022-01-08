import { Reducer } from "react";
import { User } from "../../models/Auth/User";
import { AuthActions, AuthStoreActions } from "../actions/auth.actions";

export interface Auth {
    isLoggedIn: boolean;
    user: User;
}

export const userInitialState: User = {
    id: '',
    username: '',
    email: '',
    systemRole: ''
}

export const authInitialState: Auth = {
    isLoggedIn: false,
    user: userInitialState
}

export const authStoreReducer: Reducer<Auth, AuthActions> = 
    (state: Auth = authInitialState, actions: AuthActions): Auth => {
        switch (actions.type) {
            case AuthStoreActions.SET_USER:
                return {
                    isLoggedIn: true,
                    user: actions.user
                };
            case AuthStoreActions.REMOVE_USER:
                return {
                    isLoggedIn: false,
                    user: actions.user
                };
            default:
                return state;
        }
    }
