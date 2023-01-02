import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchMovieReviews = createAsyncThunk(
    'movieReviews/fetchMovieReviews',

    async (id) => {
        const { getReviewsAboutMovie } = useMovieService();

        return await getReviewsAboutMovie(id);
    }
);

const initialState = {
    movieReviews: [],
    movieReviewsLoadingStatus: 'idle',
};

const movieReviewsSlice = createSlice({
    name: 'movieReviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieReviews.pending, (state, action) => {
                state.movieReviewsLoadingStatus = 'loading';
            })
            .addCase(fetchMovieReviews.fulfilled, (state, action) => {
                state.movieReviewsLoadingStatus = 'idle';
                state.movieReviews = action.payload;
            })
            .addCase(fetchMovieReviews.rejected, (state, action) => {
                state.movieReviewsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = movieReviewsSlice;

export default reducer;
