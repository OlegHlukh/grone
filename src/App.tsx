import { initUser } from 'store/user';
import { addCavePoints, startLoading, finishLoading } from 'store/cave';
import { UserInitBody } from './api';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect, useRef } from 'react';

import WebSocket from 'isomorphic-ws';
import Cave from './components/cave/cave.tsx';
import Drone from './components/drone.tsx';

const SERVER_URL = 'wss://cave-drone-server.shtoa.xyz/cave';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const isLoadEnought = useAppSelector((state) => state.cave.isLoadEnough);

  const socketRef = useRef<any | null>(null);

  const loadedRef = useRef<number[][]>([]);

  const handleInitProduct = async () => {
    const body: UserInitBody = {
      name: 'some',
      complexity: 0,
    };

    dispatch(initUser(body));
  };

  useEffect(() => {
    if (!user.id && !user.token) {
      return;
    }

    socketRef.current = new WebSocket(SERVER_URL);

    socketRef.current.onopen = () => {
      console.log('connect');

      dispatch(startLoading);

      const authString = `player:${user.id}-${user.token}`;

      socketRef.current.send(authString);
    };

    socketRef.current.onmessage = (message: { data: string }) => {
      console.log(message);

      const parsedPoints = parseCavePoints(message.data);

      loadedRef.current.push(parsedPoints);

      console.log(loadedRef.current);
    };

    socketRef.current.onclose = () => {
      console.log('close');
      dispatch(finishLoading);
    };
  }, [user.token, user.id]);

  useEffect(() => {}, []);

  return (
    <>
      {/*<button onClick={handleInitProduct}>fdsamo</button>*/}
      <Cave />
    </>
  );
}

export default App;

const parseCavePoints = (data: string) => {
  return data.split(',').map((el) => parseInt(el));
};
