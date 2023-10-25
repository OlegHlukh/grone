import { GameState } from 'types';
import { FC } from 'react';
import styled from 'styled-components';

interface StateProps {
  gameState: GameState;
  score: number;
}

// todo refactor
export const State: FC<StateProps> = ({ gameState, score }) => {
  if (gameState === GameState.Lost) {
    return (
      <StateWarapper>
        You lost. Try again!
        <p>
          <strong>{score}</strong>
        </p>
      </StateWarapper>
    );
  }

  if (gameState === GameState.Won) {
    return (
      <StateWarapper>
        You won! Congratulation.
        <p>
          <strong>{score}</strong>
        </p>
      </StateWarapper>
    );
  }

  return null;
};

const StateWarapper = styled.div`
  display: grid;

  justify-items: center;
`;
