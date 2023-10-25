import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './user/user-slice.ts';
import cave from './cave/cave-slice.ts';
import drone from './drone/drone-slice.ts';
import game from './game/game-slice.ts';
import board from './board-slice.ts';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['board'],
};

const rootReduce = combineReducers({
  user,
  cave,
  drone,
  game,
  board,
});

const persistedReducer = persistReducer(persistConfig, rootReduce);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
