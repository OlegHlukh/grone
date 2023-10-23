import { DronePosition, MoveDirection } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { moveMap } from './helpers.ts';

const MAX_SPEED = 6;
const MIN_SPEED = 1


interface DroneState {
  dronePosition: DronePosition;
  moveDirection: MoveDirection;
  horizontalSpeed: number;
  verticalSpeed: number;
  pauseCache: {
    horizontalSpeed: number;
    verticalSpeed: number;
    moveDirection: MoveDirection;
  } | null;
}

const initialState: DroneState = {
  dronePosition: {
    startPoint: { x: 0, y: 0 },
    apex: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  },
  horizontalSpeed: 0,
  verticalSpeed: 0,
  moveDirection: 'down',
  pauseCache: null,
};

const droneSlice = createSlice({
  name: 'drone',
  initialState,
  reducers: {
    initDronePosition: (state, action: PayloadAction<DronePosition>) => {
      state.dronePosition = action.payload;
    },
    increaseHorizontalSpeed: (state) => {
      if (state.horizontalSpeed < MAX_SPEED) {
        state.horizontalSpeed++;
      }
    },
    decreaseHorizontalSpeed: (state) => {
      if (state.horizontalSpeed > MIN_SPEED) {
        state.horizontalSpeed--;
      }
    },
    increaseVerticalSpeed: (state) => {
      if (state.verticalSpeed < MAX_SPEED) {
        state.verticalSpeed++;
      }
    },
    decreaseVerticalSpeed: (state) => {
      if (state.verticalSpeed > MIN_SPEED) {
        state.verticalSpeed--;
      }
    },
    horizontalMove: (state) => {
      const move = state.moveDirection;
      const speed = state.verticalSpeed;

      moveMap[move](speed, state.dronePosition);
    },
    verticalMove: (state) => {
      const move = 'down';
      const speed = state.verticalSpeed;

      moveMap[move](speed, state.dronePosition);
    }
  },
});

export const {
  initDronePosition,
  decreaseHorizontalSpeed,
  increaseHorizontalSpeed,
  increaseVerticalSpeed,
  decreaseVerticalSpeed,
} = droneSlice.actions;
export default droneSlice.reducer;
