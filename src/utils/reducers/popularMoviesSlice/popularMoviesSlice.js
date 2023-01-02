import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchPopularMovies = createAsyncThunk(
    'popularMovies/fetchPopularMovies',

    async (page) => {
        const { getPopularMovies } = useMovieService();

        return await getPopularMovies(page);
    }
);

const initialState = {
    popularMovies: [],
    popularMoviesLoadingStatus: 'idle',
};

const popularMoviesSlice = createSlice({
    name: 'popularMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.pending, (state, action) => {
                state.popularMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popularMoviesLoadingStatus = 'idle';
                state.popularMovies = action.payload;
            })
            .addCase(fetchPopularMovies.rejected, (state, action) => {
                state.popularMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = popularMoviesSlice;

export default reducer;
