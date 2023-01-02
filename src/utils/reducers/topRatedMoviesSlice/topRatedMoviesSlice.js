import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchTopRatedMovies = createAsyncThunk(
    'topRated/fetchTopRatedMovies',

    async (page) => {
        const { getTopRatedMovies } = useMovieService();

        return await getTopRatedMovies(page);
    }
);

const initialState = {
    topRatedMovies: [],
    topRatedMoviesLoadingStatus: 'idle',
};

const topRatedMoviesSlice = createSlice({
    name: 'topRated',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopRatedMovies.pending, (state, action) => {
                state.topRatedMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.topRatedMoviesLoadingStatus = 'idle';
                state.topRatedMovies = action.payload;
            })
            .addCase(fetchTopRatedMovies.rejected, (state, action) => {
                state.topRatedMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = topRatedMoviesSlice;

export default reducer;
