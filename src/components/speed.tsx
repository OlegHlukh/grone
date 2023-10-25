import { FC } from 'react';
import { useAppSelector } from 'hooks';
import styled from 'styled-components';

export const Speed: FC = () => {
  const { horizontalSpeed, verticalSpeed } = useAppSelector(
    (state) => state.drone,
  );

  return (
    <SpeedWrapper>
      <div>
        <span>Horizontal speed:</span> <strong>{horizontalSpeed}</strong>
      </div>
      <div>
        <span>Vertical speed:</span> <strong>{verticalSpeed}</strong>
      </div>
    </SpeedWrapper>
  );
};

const SpeedWrapper = styled.div`
  display: flex;
  gap: 10px;

  color: #fff;
`;
