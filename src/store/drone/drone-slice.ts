import { DronePosition, MoveDirection, WallsPolyline } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isTrianglePolylineCollision } from '../../components/cave/utils.ts';

const MAX_SPEED = 6;
const MIN_SPEED = 1;

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
  collision: boolean;
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
  collision: false,
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
      if (state.verticalSpeed >= MIN_SPEED) {
        state.verticalSpeed--;
      }
    },
    horizontalMove: (state) => {
      const speed = state.horizontalSpeed;

      state.dronePosition.startPoint.x += speed;
      state.dronePosition.endPoint.x += speed;
      state.dronePosition.apex.x += speed;
    },
    verticalMove: (state) => {
      const speed = state.verticalSpeed;

      state.dronePosition.apex.y += speed;
      state.dronePosition.endPoint.y += speed;
      state.dronePosition.startPoint.y += speed;
    },
    setMoveDirection: (state, action: PayloadAction<MoveDirection>) => {
      state.moveDirection = action.payload;
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
    isCollision: (
      state,
      // action: PayloadAction<WallsPolyline>
      action: PayloadAction<number[][]>,
    ) => {
      // const { left, right } = action.payload;

      console.log(action.payload);

      const isColision = isTrianglePolylineCollision(
        state.dronePosition,
        action.payload,
      );
      // isTrianglePolylineCollision(state.dronePosition, right);

      state.collision = isTrianglePolylineCollision(
        state.dronePosition,
        action.payload,
      );
      // isTrianglePolylineCollision(state.dronePosition, right);

      console.log(isColision, 'colision');
    },
  },
});

export const {
  initDronePosition,
  decreaseHorizontalSpeed,
  increaseHorizontalSpeed,
  increaseVerticalSpeed,
  decreaseVerticalSpeed,
  setMoveDirection,
  startMove,
  isCollision,
} = droneSlice.actions;
export default droneSlice.reducer;
