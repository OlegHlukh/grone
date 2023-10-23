import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { generatePaths, PathProps } from './utils.ts';
import Drone from '../drone.tsx';
import { useAppSelector } from '../../hooks';
import { mock } from './mock.ts';
import throttle from 'lodash.throttle';

interface CaveProps {
  wallsPoints?: number[][];
}

const SERVER_CANVAS_WIDTH = 500;

const Cave: FC<CaveProps> = ({ wallsPoints = mock }) => {
  const canvasWidth = 1000; // Ширина канвасу
  const wallHeight = 10; // Висота стін
  const wallColor = 'gray'; // Колір стін

  const { cave } = useAppSelector((state) => state.cave);

  const [droneSpeed, setDroneSpeed] = useState(1); // Початкова швидкість дрону
  const [cavePosition, setCavePosition] = useState(0);

  const multiplier = canvasWidth / SERVER_CANVAS_WIDTH;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Escape') {
        setDroneSpeed(0);
      }

      if (key === 'ArrowLeft') {
      } else if (key === 'ArrowRight') {
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let requestId: number | null;

    if (droneSpeed === 0) {
      return;
    }

    const updateCavePosition = () => {
      setCavePosition((prevPosition) => prevPosition - droneSpeed);
      requestId = requestAnimationFrame(updateCavePosition);
    };

    const throttledUpdate = throttle(updateCavePosition, 16);

    throttledUpdate();

    return () => {
      cancelAnimationFrame(requestId as number); // Зупинка скролінгу при розмонтуванні компонента
    };
  }, [droneSpeed]);

  const wallIndex = Math.floor((cavePosition / wallHeight) * -1);

  const polylineRef = useRef<{ left: number[][]; right: number[][] }>({
    left: [],
    right: [],
  });

  console.log(
    cavePosition,
    'cave position',
    wallIndex,
    polylineRef.current?.left[wallIndex],
  );

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

  console.log(polylineRef.current.left[1]);

  console.log(cavePosition, 'cavePosition');

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <svg
        width={canvasWidth}
        height={wallsPoints.length * wallHeight}
        style={{
          transform: `translateY(${cavePosition}px)`,
        }}
      >
        {walls}
        <Drone
          positionY={cavePosition}
          left={polylineRef.current.left}
          right={polylineRef.current.right}
        />
      </svg>
    </div>
  );
};

export default Cave;
