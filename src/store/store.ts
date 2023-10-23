import { configureStore } from '@reduxjs/toolkit';
import user from './user/user-slice.ts';
import cave from './cave/cave-slice.ts';
import drone from './drone/drone-slice.ts';

export const store = configureStore({
  reducer: {
    user,
    cave,
    drone,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
