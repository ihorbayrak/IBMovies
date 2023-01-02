import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchSimilarMovies = createAsyncThunk(
    'similarMovies/fetchSimilarMovies',

    async (id) => {
        const { getSimilarMovies } = useMovieService();

        return await getSimilarMovies(id);
    }
);

const initialState = {
    similarMovies: [],
    similarMoviesLoadingStatus: 'idle',
};

const similarMoviesSlice = createSlice({
    name: 'similarMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSimilarMovies.pending, (state, action) => {
                state.similarMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
                state.similarMoviesLoadingStatus = 'idle';
                state.similarMovies = action.payload;
            })
            .addCase(fetchSimilarMovies.rejected, (state, action) => {
                state.similarMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = similarMoviesSlice;

export default reducer;
