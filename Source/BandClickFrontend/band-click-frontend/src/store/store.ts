import { combineReducers } from "redux";
import { AuthActions } from "./actions/auth.actions";
import { Auth, authInitialState, authStoreReducer } from "./reducers/auth.reducer";

export type StoreActionTypes = AuthActions;

export interface StoreState {
    auth: Auth
};

export const initialStoreState: any = {
    auth: authInitialState
};

export const reducers = combineReducers<StoreState>({
    auth: authStoreReducer
} as any);
