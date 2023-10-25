import { DronePosition } from 'types';

export const getDroneInitPosition = (
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
