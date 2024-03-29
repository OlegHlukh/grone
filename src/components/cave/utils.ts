import { DronePosition } from '../../types';

export interface PathProps {
  points: number[];
  index: number;
  nextPoints: number[];
  multiplier: number;
  centerOfCanvas: number;
  wallHeight: number;
  caveWidth: number;
}

export const generatePaths = ({
  points,
  index,
  nextPoints,
  multiplier,
  centerOfCanvas,
  wallHeight,
  caveWidth,
}: PathProps) => {
  const [leftPoint, rightPoint] = points;

  const leftX = centerOfCanvas + leftPoint * multiplier;
  const rightX = centerOfCanvas - rightPoint * multiplier;

  const [nextLeft, nextRight] = nextPoints;

  const nextLeftX = centerOfCanvas + nextLeft * multiplier;
  const nextRightX = centerOfCanvas - nextRight * multiplier;

  const y = index * wallHeight;
  const nextY = (index + 1) * wallHeight;

  const leftPath = `M0 ${y} L${leftX} ${y} L${nextLeftX} ${nextY} L0 ${nextY} Z`;
  const rightPath = `M${caveWidth} ${y} L${caveWidth - rightX} ${y} L${
    caveWidth - nextRightX
  } ${nextY} L${caveWidth} ${nextY} Z`;

  return {
    leftPath,
    rightPath,
  };
};

export function isTrianglePolylineCollision(
  triangle: DronePosition,
  polyline: number[][],
) {
  const { x: x1, y: y1 } = triangle.startPoint;
  const { x: x2, y: y2 } = triangle.apex;
  const { x: x3, y: y3 } = triangle.endPoint;

  for (let i = 0; i < polyline?.length - 1; i++) {
    const [x4, y4] = polyline[i];
    const [x5, y5] = polyline[i + 1];

    // Перевірка перетину сторони трикутника і сегмента ламаної лінії

    if (isIntersecting(x1, y1, x2, y2, x4, y4, x5, y5)) return true;
    if (isIntersecting(x2, y2, x3, y3, x4, y4, x5, y5)) return true;
    if (isIntersecting(x3, y3, x1, y1, x4, y4, x5, y5)) return true;
  }

  return false; // Якщо жодна з умов не виконалася, то колізії немає
}

function isIntersecting(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
): boolean {
  // Обчислити вектори відрізків та їх коефіцієнти
  const v1x = x2 - x1;
  const v1y = y2 - y1;
  const v2x = x4 - x3;
  const v2y = y4 - y3;

  const d = v1x * v2y - v1y * v2x;

  // Якщо d близьке до 0, відрізки паралельні
  if (Math.abs(d) < Number.EPSILON) {
    return false;
  }

  const t1 = ((x3 - x1) * v2y - (y3 - y1) * v2x) / d;
  const t2 = ((x3 - x1) * v1y - (y3 - y1) * v1x) / d;

  // Якщо обидва t1 та t2 знаходяться в інтервалі [0, 1], то відрізки перетинаються
  return t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1;
}
