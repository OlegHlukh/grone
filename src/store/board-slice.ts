import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../types/board.ts';
import { RootState } from './store.ts';

interface BoardState {
  board: Board[];
}

const initialState: BoardState = {
  board: [] as Board[],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addToBoard: (state, action: PayloadAction<Board>) => {
      state.board.push(action.payload);
    },
  },
});

export default boardSlice.reducer;
export const { addToBoard } = boardSlice.actions;

const board = (state: RootState) => state.board.board;

export const boardSelector = createSelector([board], (board) => {
  return board.sort((a, b) => a.score - b.score).slice(0, 5);
});
