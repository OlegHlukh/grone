import { Boards } from './components/boards.tsx';
import styled from 'styled-components';
import { useGameInit } from './hooks/useGameInit.ts';
import { useAppSelector } from './hooks';
import { GameState } from './types';
import { Game } from './components/game.tsx';

function App() {
  useGameInit();

  const { isLoading, state } = useAppSelector((state) => state.game);

  return (
    <Root>
      {state === GameState.Playing ? (
        <Game isLoading={isLoading} />
      ) : (
        <Boards />
      )}
    </Root>
  );
}

export default App;

const Root = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;
