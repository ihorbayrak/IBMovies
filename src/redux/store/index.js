import { configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import filters from '../reducers/filtersSlice/filtersSlice';
import auth from '../reducers/authSlice/authSlice';
import watchListReducer from '../reducers/watchListSlice/watchListSlice';
import navMenu from '../reducers/navMenuSlice/navMenuSlice';
import { apiSlice } from '../api/apiSlice';

const persistConfig = {
    key: 'watchList',
    storage,
};

const persistedReducer = persistReducer(persistConfig, watchListReducer);

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filters,
        auth,
        watchList: persistedReducer,
        navMenu,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export const persistor = persistStore(store);
