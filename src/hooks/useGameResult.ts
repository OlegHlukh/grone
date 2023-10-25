import { useEffect } from 'react';
import { GameState } from '../types';
import { addToBoard } from '../store/board-slice.ts';
import { useAppDispatch, useAppSelector } from './redux.ts';

export const useGameResult = () => {
  const { score, state } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(state, 'game');

    if (state === GameState.Won || state === GameState.Lost) {
      dispatch(
        addToBoard({
          userName: user.name,
          score,
        }),
      );
    }
  }, [user.name, state]);
};
