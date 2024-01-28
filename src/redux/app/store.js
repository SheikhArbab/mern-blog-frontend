// Import necessary libraries and modules
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { authApi } from '../services/auth';
import { postsApi } from '../services/post';
import { commentApi } from '../services/comment';
import { authReducer, themeReducer } from '../features/index';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
});

// Configure Redux persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, postsApi.middleware, commentApi.middleware),
});

// Create Redux persistor
export const persistor = persistStore(store);