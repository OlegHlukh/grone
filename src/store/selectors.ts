import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

const wallIndexSelector = (state: RootState) => state.cave.wallIndex;
const verticalSpeedSelector = (state: RootState) => state.drone.verticalSpeed;
const complexitySelector = (state: RootState) => state.game.complexity;

export const scoreSelector = createSelector(
  [wallIndexSelector, complexitySelector, verticalSpeedSelector],
  (wallIndex, verticalSpeed, complexity) => {
    if (wallIndex === 0) {
      return 0;
    }

    const multiplayer = wallIndex * 0.01;

    return +(multiplayer + complexity + verticalSpeed).toFixed(0);
  },
);
