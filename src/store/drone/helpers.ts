import { DronePosition, MoveDirection } from '../../types';

type MoveAction = (speed: number, prevState: DronePosition) => void;

const moveLeft: MoveAction = (speed, prevState) => {
  prevState.startPoint.x -= speed;
  prevState.endPoint.x -= speed;
  prevState.apex.x -= speed;
};

const moveRight: MoveAction = (speed, prevState) => {
  prevState.startPoint.x += speed;
  prevState.endPoint.x += speed;
  prevState.apex.x += speed;
}

const moveDown: MoveAction = (speed, prevState) => {
  prevState.apex.y -= speed;
  prevState.endPoint.y -= speed;
  prevState.startPoint.y -= speed;
}

export const moveMap: Record<MoveDirection, MoveAction> = {
  left: moveLeft,
  right: moveRight,
  down: moveDown,
};
