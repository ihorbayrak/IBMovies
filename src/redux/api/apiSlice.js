import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { transformMovieData, transformReviewData } from '../../utils/functions/functions';

const API_KEY = 'api_key=a5ac3cd4dd4b5b42af35146da0290f00';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getTrendingMovies: builder.query({
            query: (period = 'day') => `trending/movie/${period}?${API_KEY}`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getPopularMovies: builder.query({
            query: (page = 1) => `movie/popular?${API_KEY}&language=en-US&page=${page}`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getTopRatedMovies: builder.query({
            query: (page = 1) => `movie/top_rated?${API_KEY}&language=en-US&page=${page}`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getNowPlayingMovies: builder.query({
            query: (page = 1) => `movie/now_playing?${API_KEY}&language=en-US&page=${page}`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getInfoAboutMovie: builder.query({
            query: (id) => `movie/${id}?${API_KEY}&language=en-US`,
            transformResponse: (response) => transformMovieData(response),
        }),
        getRecMovies: builder.query({
            query: (id) => `movie/${id}/recommendations?${API_KEY}&language=en-US&page=1`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getSimilarMovies: builder.query({
            query: (id) => `movie/${id}/similar?${API_KEY}&language=en-US&page=1`,
            transformResponse: (response) => response.results.map(transformMovieData),
        }),
        getReviewsAboutMovie: builder.query({
            query: (id) => `movie/${id}/reviews?${API_KEY}&language=en-US&page=1`,
            transformResponse: (response) => response.results.map(transformReviewData),
        }),
        getMovieGenres: builder.query({
            query: () => `genre/movie/list?${API_KEY}&language=en-US`,
            transformResponse: (response) => response.genres,
        }),
    }),
});

export const {
    useGetTrendingMoviesQuery,
    useGetInfoAboutMovieQuery,
    useGetMovieGenresQuery,
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetRecMoviesQuery,
    useGetReviewsAboutMovieQuery,
    useGetSimilarMoviesQuery,
    useGetTopRatedMoviesQuery,
} = apiSlice;
