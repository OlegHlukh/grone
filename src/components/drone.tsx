import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { initDronePosition } from 'store/drone';
import { DronePosition } from 'types';

const caveWidth = 1000; // Ширина печери
const droneSize = 30;

const Drone: FC = () => {
  const dispatch = useAppDispatch();
  const dronePosition = useAppSelector((state) => state.drone.dronePosition);

  useEffect(() => {
    const initDrone = getDroneInitPosition(caveWidth, droneSize);

    dispatch(initDronePosition(initDrone));
  }, []);

  return (
    <polygon
      style={{
        transform: `translateY(${dronePosition.startPoint.y}px)`,
      }}
      points={`${dronePosition.startPoint.x}, 0 ${dronePosition.apex.x}, ${droneSize} ${dronePosition.endPoint.x}, 0`}
      fill="blue"
    />
  );
};

export default memo(Drone);

const getDroneInitPosition = (
  caveWidth: number,
  droneSize: number,
): DronePosition => {
  const centerOfCave = Math.round(caveWidth / 2);

  return {
    startPoint: { x: centerOfCave, y: 0 },
    endPoint: { x: centerOfCave + droneSize, y: 0 },
    apex: { x: centerOfCave + droneSize / 2, y: droneSize },
  };
};
