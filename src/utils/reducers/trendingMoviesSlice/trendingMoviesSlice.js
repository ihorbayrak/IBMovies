import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchTrendingMovies = createAsyncThunk(
    'trendingMovies/fetchTrendingMovies',
    async (period) => {
        const { getTrendingMovies } = useMovieService();

        return await getTrendingMovies(period);
    }
);

const initialState = {
    trendingMovies: [],
    trendingMoviesLoadingStatus: 'idle',
};

export const trendingMoviesSlice = createSlice({
    name: 'trendingMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingMovies.pending, (state, action) => {
                state.trendingMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.trendingMoviesLoadingStatus = 'idle';
                state.trendingMovies = action.payload;
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.trendingMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = trendingMoviesSlice;

export default reducer;
