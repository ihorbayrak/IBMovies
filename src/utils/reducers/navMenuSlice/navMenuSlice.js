import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuLinks: [
        { id: 1, label: 'home', route: '/' },
        { id: 2, label: 'popularity', route: '/popular-films' },
        { id: 3, label: 'top rated', route: '/top-rated-films' },
        { id: 4, label: 'now playing', route: '/now-playing' },
    ],
    hamburgerMenuActive: false,
};

const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState,
    reducers: {
        toggleHamburgerMenu: (state, action) => {
            state.hamburgerMenuActive = !state.hamburgerMenuActive;
        },
        closeHamburgerMenu: (state, action) => {
            state.hamburgerMenuActive = false;
        },
    },
});

const { actions, reducer } = navMenuSlice;

export const { toggleHamburgerMenu, closeHamburgerMenu } = actions;

export default reducer;
