import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { scoreSelector } from '../store/selectors.ts';
import { updateScore } from '../store/game';

export const Score: FC = () => {
  const score = useAppSelector(scoreSelector);
  const dispatch = useAppDispatch();
  const totalScore = useAppSelector((state) => state.game.score);

  useEffect(() => {
    dispatch(updateScore(score));
  }, [score]);

  return (
    <ScoreWrapper>
      <span>Score:</span> <strong>{totalScore}</strong>
    </ScoreWrapper>
  );
};

const ScoreWrapper = styled.div`
  display: flex;
  gap: 10px;

  color: #fff;
`;
