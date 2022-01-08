import { User } from "../../models/Auth/User";

export enum AuthStoreActions {
    SET_USER = 'SET_USER',
    REMOVE_USER = 'REMOVE_USER'
}

export interface SetUserAction {
    type: AuthStoreActions.SET_USER,
    user: User
}

export interface RemoveUserAction {
    type: AuthStoreActions.REMOVE_USER,
    user: User
}

export type AuthActions = SetUserAction | RemoveUserAction;

export const authAction = {
    setUser: (user: User): SetUserAction => ({
        type: AuthStoreActions.SET_USER,
        user: user
    }),
    removeUser: (): RemoveUserAction => ({
        type: AuthStoreActions.REMOVE_USER,
        user: {
            id: '',
            username: '',
            email: '',
            systemRole: ''
        }
    })
}
