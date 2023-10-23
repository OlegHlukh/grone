import { useAppDispatch, useAppSelector } from './redux.ts';
import {
  increaseVerticalSpeed,
  decreaseVerticalSpeed,
  increaseHorizontalSpeed,
  decreaseHorizontalSpeed,
  setMoveDirection,
} from 'store/drone';
import { useEffect } from 'react';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

type KeyMapHandler = (dispatch: Dispatch<AnyAction>) => void;

const keyHandlerMap: Record<string, KeyMapHandler> = {
  ArrowRight: (dispatch) => {
    dispatch(increaseHorizontalSpeed());
    dispatch(setMoveDirection('right'));
  },
  ArrowLeft: (dispatch) => {
    dispatch(decreaseHorizontalSpeed());
    dispatch(setMoveDirection('left'));
  },
  ArrowUp: (dispatch) => {
    dispatch(decreaseVerticalSpeed());
  },
  ArrowDown: (dispatch) => {
    dispatch(increaseVerticalSpeed());
  },
};

export const useControls = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.drone);

  useEffect(() => {
    const handleKeyPres = (e: KeyboardEvent) => {
      const key = e.key as keyof typeof keyHandlerMap;

      keyHandlerMap[key](dispatch);
    };

    window.addEventListener('keydown', handleKeyPres);

    return () => {
      window.removeEventListener('keydown', handleKeyPres);
    };
  }, []);
};
