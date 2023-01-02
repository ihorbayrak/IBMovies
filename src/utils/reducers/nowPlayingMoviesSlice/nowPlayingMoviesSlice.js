import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchNowPlayingMovies = createAsyncThunk(
    'nowPlaying/fetchNowPlayingMovies',

    async (page) => {
        const { getNowPlayingMovies } = useMovieService();

        return await getNowPlayingMovies(page);
    }
);

const initialState = {
    nowPlayingMovies: [],
    nowPlayingMoviesLoadingStatus: 'idle',
    currentPage: 1,
};

const nowPlayingMoviesSlice = createSlice({
    name: 'nowPlaying',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNowPlayingMovies.pending, (state, action) => {
                state.nowPlayingMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlayingMoviesLoadingStatus = 'idle';
                state.nowPlayingMovies.push(...action.payload);
                state.currentPage = state.currentPage + 1;
            })
            .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
                state.nowPlayingMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const {  reducer } = nowPlayingMoviesSlice;

export default reducer;
