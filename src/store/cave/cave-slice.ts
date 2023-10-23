import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseState } from 'types';

interface CaveState extends BaseState {
  cave: number[][];
  isLoadEnough: boolean;
  isFinished: boolean;
}

const initialState: CaveState = {
  isFinished: false,
  loading: false,
  cave: [] as number[][],
  error: null,
  isLoadEnough: false,
};

const caveSlice = createSlice({
  name: 'cave',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    addCavePoints: (state, action: PayloadAction<number[]>) => {
      if (state.cave.length >= 100) {
        state.isLoadEnough = true;
      }

      state.cave.push(action.payload);
    },
    finishLoading: (state) => {
      state.isFinished = true;
    },
  },
});

export const { startLoading, finishLoading, addCavePoints } = caveSlice.actions;
export default caveSlice.reducer;
