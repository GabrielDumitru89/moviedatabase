import { configureStore, combineReducers } from '@reduxjs/toolkit'
import appReducer from './slices/appSlices'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});