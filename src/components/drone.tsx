import { FC } from 'react';
import { DronePosition } from 'types';

const droneSize = 15;

interface DroneProps {
  dronePosition: DronePosition;
}

const Drone: FC<DroneProps> = ({ dronePosition }) => {
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

export default Drone;
