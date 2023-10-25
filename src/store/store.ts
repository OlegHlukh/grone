import { configureStore } from '@reduxjs/toolkit';
import user from './user/user-slice.ts';
import cave from './cave/cave-slice.ts';
import drone from './drone/drone-slice.ts';
import game from './game/game-slice.ts';
import board from './board-slice.ts';

export const store = configureStore({
  reducer: {
    user,
    cave,
    drone,
    game,
    board,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
