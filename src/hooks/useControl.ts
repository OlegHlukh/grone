import { useAppDispatch } from './redux.ts';
import {
  increaseVerticalSpeed,
  decreaseVerticalSpeed,
  increaseHorizontalSpeed,
  decreaseHorizontalSpeed,
} from 'store/drone';
import { useEffect } from 'react';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

type KeyMapHandler = (dispatch: Dispatch<AnyAction>) => void;

const keyHandlerMap: Record<string, KeyMapHandler> = {
  ArrowRight: (dispatch) => {
    dispatch(increaseHorizontalSpeed());
  },
  ArrowLeft: (dispatch) => {
    dispatch(decreaseHorizontalSpeed());
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
