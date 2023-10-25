import { useEffect, useRef } from 'react';
import { Polyline } from '../types';
import { useAppDispatch, useAppSelector } from './redux.ts';
import { startGame } from '../store/game';
import WebSocket from 'isomorphic-ws';
import { addCavePoints, finishLoading } from '../store/cave';

const SERVER_URL = 'wss://cave-drone-server.shtoa.xyz/cave';
const LOADED_CHUNK = 50;

export const useGameInit = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const socketRef = useRef<any | null>(null);

  const loadedRef = useRef<{
    length: number;
    polyline: Polyline;
  }>({ length: 0, polyline: [] });

  useEffect(() => {
    const userCanStartPlay = user.token && user.id;

    if (!userCanStartPlay) {
      return;
    }

    socketRef.current = new WebSocket(SERVER_URL);

    socketRef.current.onopen = () => {
      const authString = `player:${user.id}-${user.token}`;

      socketRef.current.send(authString);
    };

    socketRef.current.onmessage = (message: { data: string }) => {
      const parsedPoints = parseCavePoints(message.data);

      if (!parsedPoints) {
        return;
      }

      loadedRef.current.length += 1;
      loadedRef.current.polyline.push(parsedPoints);

      if (loadedRef.current.polyline.length === LOADED_CHUNK) {
        dispatch(addCavePoints(loadedRef.current.polyline));

        loadedRef.current.polyline.length = 0;
      }

      if (loadedRef.current.length === 200) {
        dispatch(startGame());
      }
    };

    socketRef.current.onclose = () => {
      dispatch(addCavePoints(loadedRef.current.polyline));
      dispatch(finishLoading());
    };

    socketRef.current.onerror = () => {
      dispatch(addCavePoints(loadedRef.current.polyline));
    };

    return () => {
      socketRef.current = null;
      loadedRef.current.length = 0;
      loadedRef.current.polyline.length = 0;
    };
  }, [user]);
};

const parseCavePoints = (data: string) => {
  const splitData = data.split(',');

  if (splitData.length !== 2) {
    return null;
  }

  return data.split(',').map((el) => parseInt(el));
};
