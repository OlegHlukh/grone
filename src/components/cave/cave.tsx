import { FC, useEffect, useMemo } from 'react';
import { generatePaths, PathProps } from './utils.ts';
import Drone from '../drone.tsx';
import { useAppDispatch, useAppSelector } from 'hooks';
import styled from 'styled-components';
import { updateWallIndex } from 'store/cave';
import { useGame } from 'hooks/useGame.ts';
import { initDronePosition } from 'store/drone';
import { getDroneInitPosition } from 'store/drone/helpers.ts';

const SERVER_CANVAS_WIDTH = 500;
const droneSize = 20;

const Cave: FC = () => {
  const wallColor = 'gray'; // Колір стін

  useGame();

  const dronePosition = useAppSelector((state) => state.drone.dronePosition);
  const { cave, caveWidth, wallHeight } = useAppSelector((state) => state.cave);
  const dispatch = useAppDispatch();

  const droneYPosition = dronePosition.startPoint.y;
  const wallIndex = Math.round(droneYPosition / wallHeight);

  useEffect(() => {
    const init = getDroneInitPosition(caveWidth, droneSize);

    dispatch(initDronePosition(init));
  }, []);

  useEffect(() => {
    if (wallIndex === 0) {
      return;
    }

    dispatch(updateWallIndex(wallIndex));
  }, [wallIndex]);

  const multiplier = caveWidth / SERVER_CANVAS_WIDTH;

  const walls = useMemo(
    () =>
      cave.map((points, index, wallsPoints) => {
        const centerOfCanvas = Math.round(caveWidth / 2);

        const nextPoints = wallsPoints[index + 1] ?? [];

        if (!nextPoints.length) {
          return null;
        }

        const generatePathProps: PathProps = {
          points,
          index,
          nextPoints,
          multiplier,
          caveWidth,
          centerOfCanvas,
          wallHeight,
        };

        const { leftPath, rightPath } = generatePaths(generatePathProps);

        return (
          <g key={index}>
            <path d={leftPath} fill={wallColor} />
            <path d={rightPath} fill={wallColor} />
          </g>
        );
      }),
    [cave.length, caveWidth],
  );

  return (
    <CaveWrapper>
      <svg
        width={caveWidth}
        height={cave.length * wallHeight}
        style={{
          transform: `translateY(${-droneYPosition}px)`,
        }}
      >
        {walls}
        <Drone dronePosition={dronePosition} />
      </svg>
    </CaveWrapper>
  );
};

const CaveWrapper = styled.div`
  overflow: hidden;
  height: 100vh;
`;

export default Cave;
