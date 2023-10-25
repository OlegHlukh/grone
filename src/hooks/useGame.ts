import { useAppDispatch, useAppSelector } from './redux.ts';
import { isCollisionSelector, startMove } from '../store/drone';
import { useEffect } from 'react';
import { updateState } from '../store/game';
import { GameState } from '../types';
import throttle from 'lodash.throttle';
import { addToBoard } from '../store/board-slice.ts';

export const useGame = () => {
  const collision = useAppSelector(isCollisionSelector);
  const wallIndex = useAppSelector((state) => state.cave.wallIndex);
  const caveHeight = useAppSelector((state) => state.cave.cave.length);
  const score = useAppSelector((state) => state.game.score);
  const userName = useAppSelector((state) => state.user.user.name);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let requestId: number | null;

    const updateCavePosition = () => {
      dispatch(startMove());
      requestId = requestAnimationFrame(updateCavePosition);
    };

    const throttledUpdate = throttle(updateCavePosition, 16);
    throttledUpdate();

    return () => {
      cancelAnimationFrame(requestId as number);
    };
  }, []);

  useEffect(() => {
    if (wallIndex === caveHeight) {
      dispatch(updateState(GameState.Won));
      dispatch(addToBoard({ userName, score }));

      return;
    }
  }, [wallIndex]);

  useEffect(() => {
    if (collision) {
      dispatch(updateState(GameState.Lost));
      dispatch(addToBoard({ userName, score }));
    }
  }, [collision]);
};
