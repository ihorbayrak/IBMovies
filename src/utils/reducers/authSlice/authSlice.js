import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authUser: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.isLoggedIn = true;
            state.authUser = action.payload;
        },
        removeCurrentUser: (state, action) => {
            state.isLoggedIn = false;
            state.authUser = null;
        },
    },
});

const { actions, reducer } = authSlice;

export const { setCurrentUser, removeCurrentUser } = actions;

export default reducer;
