import { createSelector } from 'reselect';
import { StoreState } from '../store';

const authSelector = {
    getUser: createSelector(
        (state: StoreState) => state.auth,
        user => user.user
    ),
    isLoggedIn: createSelector(
        (state: StoreState) => state.auth,
        isLoggedIn => isLoggedIn.isLoggedIn
    )
};

export default authSelector;
