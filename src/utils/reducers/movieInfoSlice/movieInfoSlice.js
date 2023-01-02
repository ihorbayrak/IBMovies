import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchMovieInfo = createAsyncThunk(
    'movieInfo/fetchMovieInfo',

    async (id) => {
        const { getInfoAboutMovie } = useMovieService();

        return await getInfoAboutMovie(id);
    }
);

const initialState = {
    movieInfo: {},
    movieInfoLoadingStatus: 'idle',
};

const movieInfoSlice = createSlice({
    name: 'movieInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieInfo.pending, (state, action) => {
                state.movieInfoLoadingStatus = 'loading';
            })
            .addCase(fetchMovieInfo.fulfilled, (state, action) => {
                state.movieInfoLoadingStatus = 'idle';
                state.movieInfo = action.payload;
            })
            .addCase(fetchMovieInfo.rejected, (state, action) => {
                state.movieInfoLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = movieInfoSlice;

export default reducer;
