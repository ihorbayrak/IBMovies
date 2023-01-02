import { configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filters from '../utils/reducers/filtersSlice/filtersSlice';
import trendingMovies from '../utils/reducers/trendingMoviesSlice/trendingMoviesSlice';
import popularMovies from '../utils/reducers/popularMoviesSlice/popularMoviesSlice';
import topRated from '../utils/reducers/topRatedMoviesSlice/topRatedMoviesSlice';
import nowPlaying from '../utils/reducers/nowPlayingMoviesSlice/nowPlayingMoviesSlice';
import similarMovies from '../utils/reducers/similarMoviesSlice/similarMoviesSlice';
import recMovies from '../utils/reducers/recMoviesSlice/recMoviesSlice';
import movieReviews from '../utils/reducers/movieReviewsSlice/movieReviewsSlice';
import movieInfo from '../utils/reducers/movieInfoSlice/movieInfoSlice';
import movieGenres from '../utils/reducers/movieGenresSlice/movieGenresSlice';
import auth from '../utils/reducers/authSlice/authSlice';
import watchListReducer from '../utils/reducers/watchListSlice/watchListSlice';
import navMenu from '../utils/reducers/navMenuSlice/navMenuSlice';

const persistConfig = {
    key: 'watchList',
    storage,
};

const persistedReducer = persistReducer(persistConfig, watchListReducer);

const store = configureStore({
    reducer: {
        filters,
        trendingMovies,
        popularMovies,
        topRated,
        nowPlaying,
        similarMovies,
        recMovies,
        movieReviews,
        movieInfo,
        movieGenres,
        auth,
        watchList: persistedReducer,
        navMenu,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export const persistor = persistStore(store);
