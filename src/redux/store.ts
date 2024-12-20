import {combineReducers, configureStore} from '@reduxjs/toolkit';
import useReducer from '../redux/slice/userSlice';
import favoritesReducer from '../redux/slice/userSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'], // Only persist the favorites slice
};

const rootReducer = combineReducers({
  users: useReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
