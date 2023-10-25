import { useEffect } from 'react';
import throttle from 'lodash.throttle';
import { useAppDispatch } from './redux.ts';
import { setCaveWidth } from '../store/cave';

export const useWindowSize = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCaveWidth(window.innerWidth));

    const handleResize = throttle(() => {
      dispatch(setCaveWidth(window.innerWidth));
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
