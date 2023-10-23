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
  score: number;
  pauseCache: {
    horizontalSpeed: number;
    verticalSpeed: number;
    moveDirection: MoveDirection;
  } | null;
}

const initialState: GameSliceState = {
  state: 'ready',
  score: 0,
  pauseCache: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
  },
});

export default gameSlice.reducer;
export const { updateState } = gameSlice.actions;
