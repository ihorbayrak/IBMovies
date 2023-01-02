import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useMovieService from '../../../services/MovieService';

export const fetchRecMovies = createAsyncThunk(
    'recMovies/fetchRecMovies',

    async (id) => {
        const { getRecMovies } = useMovieService();

        return await getRecMovies(id);
    }
);

const initialState = {
    recMovies: [],
    recMoviesLoadingStatus: 'idle',
};

const recMoviesSlice = createSlice({
    name: 'recMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecMovies.pending, (state, action) => {
                state.recMoviesLoadingStatus = 'loading';
            })
            .addCase(fetchRecMovies.fulfilled, (state, action) => {
                state.recMoviesLoadingStatus = 'idle';
                state.recMovies = action.payload;
            })
            .addCase(fetchRecMovies.rejected, (state, action) => {
                state.recMoviesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = recMoviesSlice;

export default reducer;
