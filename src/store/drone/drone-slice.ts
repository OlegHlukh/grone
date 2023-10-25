import { DronePosition } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const MAX_SPEED = 6;
const MIN_SPEED = 1;

interface DroneState {
  dronePosition: DronePosition;
  horizontalSpeed: number;
  verticalSpeed: number;
}

const initialState: DroneState = {
  dronePosition: {
    startPoint: { x: 0, y: 0 },
    apex: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  },
  horizontalSpeed: 0,
  verticalSpeed: 1,
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
      if (state.horizontalSpeed > MAX_SPEED * -1) {
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
    verticalMove: (state) => {
      const speed = state.verticalSpeed;

      state.dronePosition.apex.y += speed;
      state.dronePosition.endPoint.y += speed;
      state.dronePosition.startPoint.y += speed;
    },
    startMove: (state) => {
      const verticalSpeed = state.verticalSpeed;
      const horizontalSpeed = state.horizontalSpeed;

      state.dronePosition.startPoint.x += horizontalSpeed;
      state.dronePosition.endPoint.x += horizontalSpeed;
      state.dronePosition.apex.x += horizontalSpeed;

      state.dronePosition.apex.y += verticalSpeed;
      state.dronePosition.endPoint.y += verticalSpeed;
      state.dronePosition.startPoint.y += verticalSpeed;
    },
    resetDroneState: () => {
      return initialState;
    },
  },
});

export const {
  initDronePosition,
  decreaseHorizontalSpeed,
  increaseHorizontalSpeed,
  increaseVerticalSpeed,
  decreaseVerticalSpeed,
  startMove,
  resetDroneState,
} = droneSlice.actions;
export default droneSlice.reducer;
