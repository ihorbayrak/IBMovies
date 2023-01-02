import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchMovieGenres = createAsyncThunk(
    'movieGenres/fetchMovieGenres',

    async () => {
        const { getMovieGenres } = useMovieService();

        return await getMovieGenres();
    }
);

const initialState = {
    movieGenres: [],
    movieGenresLoadingStatus: 'idle',
};

const movieGenresSlice = createSlice({
    name: 'movieGenres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieGenres.pending, (state, action) => {
                state.movieGenresLoadingStatus = 'loading';
            })
            .addCase(fetchMovieGenres.fulfilled, (state, action) => {
                state.movieGenresLoadingStatus = 'idle';
                state.movieGenres = action.payload;
            })
            .addCase(fetchMovieGenres.rejected, (state, action) => {
                state.movieGenresLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = movieGenresSlice;

export default reducer;
