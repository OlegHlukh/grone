import { RootState } from '../store.ts';

export const isGameLoading = (state: RootState) => state.game.isLoading;
export const getGameState = (state: RootState) => state.game.state;
