export interface Point {
  x: number;
  y: number;
}

export interface DronePosition {
  startPoint: Point; // Початкова точка трикутника
  apex: Point; // Вершина трикутника
  endPoint: Point;
}

export type GameState = 'started' | 'paused' | 'won' | 'lost' | 'ready';

export type MoveDirection = 'left' | 'right' | 'down';
