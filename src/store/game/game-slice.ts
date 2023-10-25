import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComplexityLevel, GameState } from 'types';

interface GameSliceState {
  state: GameState;
  score: number;
  complexity: ComplexityLevel;
  isLoading: boolean;
}

const initialState: GameSliceState = {
  state: GameState.None,
  score: 0,
  complexity: ComplexityLevel.VeryEasy,
  isLoading: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
    setComplexityLevel: (state, action: PayloadAction<ComplexityLevel>) => {
      state.complexity = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    startGame: (state) => {
      state.isLoading = false;
      state.state = GameState.Playing;
    },
    resetGameState: () => {
      return initialState;
    },
  },
});

export default gameSlice.reducer;
export const {
  startGame,
  updateScore,
  updateState,
  setComplexityLevel,
  setIsLoading,
  resetGameState,
} = gameSlice.actions;
