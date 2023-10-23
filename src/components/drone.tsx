import { FC, memo, useEffect, useState } from 'react';
import { removeListener } from '@reduxjs/toolkit';
import { isTrianglePolylineCollision } from './cave/utils.ts';

const caveWidth = 1000; // Ширина печери
const droneSize = 30;

type MoveDirection = 'right' | 'left' | 'stop';

interface DronePosition {
  topLeft: number[];
  bottom: number[];
  topRight: number[];
}

const MAX_SPEED = 10;
const MIN_SPEED = 1;

const Drone: FC<{ positionY: number; left: number[][]; right: number[][] }> = ({
  positionY,
  left,
  right,
}) => {
  const [dronePosition, setDronePosition] = useState<number>(() => {
    const x = (caveWidth - droneSize) / 2;

    return x;

    // return  {
    //   topLeft: [x, 0],
    //   bottom: [x + droneSize / 2, 30],
    //   topRight: [x + 30, 0],
    // }
  });

  const [moveDirection, setMoveDirection] = useState<MoveDirection>('stop');
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Escape') {
        setSpeed(0);
        setMoveDirection('stop');
      }

      if (key === 'ArrowLeft') {
        if (moveDirection === 'left') {
          setSpeed((prevState) => {
            if (prevState === MIN_SPEED) {
              return prevState;
            }
            return prevState - 1;
          });
        } else {
          setMoveDirection('left');
        }
      } else if (key === 'ArrowRight') {
        if (moveDirection === 'right') {
          setSpeed((prevState) => {
            if (prevState === MAX_SPEED) {
              return prevState;
            }

            return prevState + 1;
          });
        } else {
          setMoveDirection('right');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      return window.removeEventListener('keydown', handleKeyPress);
    };
  }, [moveDirection]);

  console.log(positionY);

  console.log(dronePosition, 'points');

  useEffect(() => {
    let requestId: number | null = null;
    const animationSpeed = 1;

    const animate = () => {
      requestId = requestAnimationFrame(animate);

      //(droneX, positionY) - ліва вершина трикутника
      // (droneX + 15, positionY + 30) - права нижня вершина
      // (droneX + 30, positionY)

      setDronePosition((prevState) => {
        if (moveDirection === 'left') {
          const triangel = [
            [prevState, positionY * -1],
            [prevState + 15, positionY * -1 + 30],
            [prevState + 30, positionY * -1],
          ];

          console.log(triangel, 'triangle');

          if (isTrianglePolylineCollision(triangel, left)) {
            console.log('colision!!!');

            return prevState;
          }

          return prevState - speed * animationSpeed;
        } else if (moveDirection === 'right') {
          const triangel = [
            [prevState, positionY * -1],
            [prevState + 15, positionY * -1 + 30],
            [prevState + 30, positionY * -1],
          ];

          if (isTrianglePolylineCollision(triangel, right)) {
            console.log('colision!!!');

            return prevState;
          }

          return prevState + speed * animationSpeed;
        }

        return prevState;
      });
    };

    animate();

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [moveDirection, speed, positionY]);

  return (
    <polygon
      style={{
        transform: `translateY(${-positionY}px)`,
      }}
      points={`${dronePosition}, 0 ${dronePosition + 15},30 ${
        dronePosition + 30
      }, 0`}
      fill="blue"
    />
  );
};

export default memo(Drone);
