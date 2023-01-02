import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    watchList: [],
    watchListStatus: 'loading',
};

const watchlistSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        addToWatchList: (state, action) => {
            state.watchList.unshift(action.payload);
        },
        removeFromWatchList: (state, action) => {
            state.watchList = state.watchList.filter((item) => item.id !== action.payload);
        },
    },
});

const { actions, reducer } = watchlistSlice;

export const { addToWatchList, removeFromWatchList } = actions;

export default reducer;
