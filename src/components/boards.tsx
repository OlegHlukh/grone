import { FC, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { NewGameModal } from './new-game-modal.tsx';
import styled from 'styled-components';
import { Button } from './ui/button.tsx';
import { State } from './game-state.tsx';
import { resetGameState } from 'store/game';
import { GameState } from 'types';
import { resetDroneState } from 'store/drone';
import { resetCaveState } from 'store/cave';
import { boardSelector } from 'store/board-slice.ts';

export const Boards: FC = () => {
  const [isOpenForm, setForm] = useState(false);

  const board = useAppSelector(boardSelector);
  const { state, score } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const openForm = () => {
    setForm(true);
    dispatch(resetDroneState());
    dispatch(resetCaveState());
    dispatch(resetGameState());
  };

  const closeForm = () => {
    setForm(false);
  };

  const buttonText = useMemo(() => {
    if (state === GameState.Won) {
      return 'Become a leader';
    }

    if (state === GameState.Lost) {
      return 'Try again';
    }

    return 'Start game';
  }, [state]);

  return (
    <Board>
      <h4>Leader board</h4>
      {board.length ? (
        <>
          {board.map((record) => (
            <Record key={record.score}>
              <span>{record.userName}:</span> <strong>{record.score}</strong>
            </Record>
          ))}
        </>
      ) : (
        <span>There is no leaderboard yet. Be the first </span>
      )}

      <State gameState={state} score={score} />
      <Button onClick={openForm} text={buttonText} />
      <NewGameModal isOpen={isOpenForm} onClose={closeForm} />
    </Board>
  );
};

const Board = styled.div`
  display: grid;
  gap: 20px;

  & h4 {
    text-align: center;
  }
`;

const Record = styled.div`
  display: flex;
  justify-content: space-between;
`;
