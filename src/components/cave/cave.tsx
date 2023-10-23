import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { generatePaths, PathProps } from './utils.ts';
import Drone from '../drone.tsx';
import { useAppDispatch, useAppSelector, useControls } from '../../hooks';
import { mock } from './mock.ts';
import throttle from 'lodash.throttle';
import { isCollision, startMove } from 'store/drone';

interface CaveProps {
  wallsPoints?: number[][];
}

const SERVER_CANVAS_WIDTH = 500;

const Cave: FC<CaveProps> = ({ wallsPoints = mock }) => {
  const canvasWidth = 1000; // Ширина канвасу
  const wallHeight = 10; // Висота стін
  const wallColor = 'gray'; // Колір стін

  const droneYPosition = useAppSelector(
    (state) => state.drone.dronePosition.startPoint.y,
  );

  const dispatch = useAppDispatch();

  const { cave } = useAppSelector((state) => state.drone);

  useControls();

  const multiplier = canvasWidth / SERVER_CANVAS_WIDTH;

  useEffect(() => {
    let requestId: number | null;

    const updateCavePosition = () => {
      dispatch(startMove());
      requestId = requestAnimationFrame(updateCavePosition);
    };

    const throttledUpdate = throttle(updateCavePosition, 16);
    throttledUpdate();

    return () => {
      cancelAnimationFrame(requestId as number); // Зупинка скролінгу при розмонтуванні компонента
    };
  }, []);

  const wallIndex = Math.floor(droneYPosition / wallHeight) ?? 0;

  const polylineRef = useRef<{ left: number[][]; right: number[][] }>({
    left: [],
    right: [],
  });

  const walls = useMemo(
    () =>
      wallsPoints.map((points, index, wallsPoints) => {
        const centerOfCanvas = Math.round(canvasWidth / 2);
        const nextPoints = wallsPoints[index + 1] ?? [];

        if (!nextPoints.length) {
          return null;
        }

        const generatePathProps: PathProps = {
          points,
          index,
          nextPoints,
          multiplier,
          canvasWidth,
          centerOfCanvas,
          wallHeight,
        };

        const { leftPath, rightPath, rightPolyline, leftPolyline } =
          generatePaths(generatePathProps);

        polylineRef.current.left.push(leftPolyline);
        polylineRef.current.right.push(rightPolyline);

        return (
          <g key={index}>
            <path d={leftPath} fill={wallColor} />
            <path d={rightPath} fill={wallColor} />
          </g>
        );
      }),
    [wallsPoints.length],
  );

  useEffect(() => {
    console.log(polylineRef.current);

    dispatch(
      isCollision(polylineRef.current.left.slice(wallIndex, wallIndex + 2)),
    );
  }, [wallIndex]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <svg
        width={canvasWidth}
        height={wallsPoints.length * wallHeight}
        style={{
          transform: `translateY(${-droneYPosition}px)`,
        }}
      >
        {walls}
        <Drone />
      </svg>
    </div>
  );
};

export default Cave;
