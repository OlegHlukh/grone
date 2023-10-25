import { FC } from 'react';
import styled from 'styled-components';
import Cave from './cave/cave.tsx';
import { useControls, useWindowSize } from 'hooks';
import { Info } from './ui/info.tsx';
import { Loader } from './ui/loader.tsx';

interface GameProps {
  isLoading: boolean;
}

export const Game: FC<GameProps> = ({ isLoading }) => {
  useWindowSize();
  useControls();

  return (
    <GameWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Info />
          <Cave />
        </>
      )}
    </GameWrapper>
  );
};

const GameWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: grid;
  place-items: center;
`;
