import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Point {
  x: number;
  y: number;
}

interface DronePosition {
  startPoint: Point; // Початкова точка трикутника
  apex: Point; // Вершина трикутника
  endPoint: Point;
}

type GameState = 'started' | 'paused' | 'won' | 'lost' | 'ready';

type MoveDirection = 'left' | 'right' | 'down';

const MAX_SPEED = 6;
const MIN_SPPED = 1;

interface GameSliceState {
  state: GameState;
  dronePosition: DronePosition;
  moveDirection: MoveDirection;
  wallPosition: number;
  horizontalSpeed: number;
  verticalSpeed: number;
  score: number;
  pauseCache: {
    horizontalSpeed: number;
    verticalSpeed: number;
    moveDirection: MoveDirection;
  } | null;
}

const initialState: GameSliceState = {
  state: 'ready',
  dronePosition: {
    startPoint: { x: 0, y: 0 },
    apex: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
  },
  wallPosition: 0,
  horizontalSpeed: 0,
  verticalSpeed: 0,
  moveDirection: 'down',
  score: 0,
  pauseCache: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
    increaseWallPosition: (state) => {
      state.wallPosition += state.verticalSpeed;
    },
    startGame: (state) => {
      state.state = 'started';
    },
    pauseGame: (state) => {
      state.state = 'paused';
      state.pauseCache = {
        horizontalSpeed: state.horizontalSpeed,
        verticalSpeed: state.verticalSpeed,
        moveDirection: state.moveDirection,
      };
    },
    resumeGame: (state) => {
      state.state = 'started';

      if (state.pauseCache) {
        state.horizontalSpeed = state.pauseCache.horizontalSpeed;
        state.verticalSpeed = state.pauseCache.verticalSpeed;
        state.moveDirection = state.pauseCache.moveDirection;

        state.pauseCache = null;
      }
    },
    setMoveDirection: (state, action: PayloadAction<MoveDirection>) => {
      state.moveDirection = action.payload;
    },
    horizontalMoveDrone: (state) => {
      // if (state.moveDirection === 'left') {
      //   state.dronePosition.startPoint = state.
      // }
    },
  },
});
