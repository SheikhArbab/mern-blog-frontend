// Import necessary libraries and modules
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { authApi } from '../services/auth';
import authReducer from '../features/authSlice';
import themeReducer from '../features/themeSlice';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
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
        getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware),
});

// Create Redux persistor
export const persistor = persistStore(store);