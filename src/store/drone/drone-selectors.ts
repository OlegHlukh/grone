import { RootState } from '../store.ts';
import { getPolyline, getWallIndex } from '../cave';
import { createSelector } from '@reduxjs/toolkit';
import { isTrianglePolylineCollision } from '../../components/cave/utils.ts';
const getDronePosition = (state: RootState) => state.drone.dronePosition;

export const isCollisionSelector = createSelector(
  [getDronePosition, getPolyline, getWallIndex],
  (dronePosition, polyline, wallIndex) => {
    const { left, right } = polyline;

    const startIndex = wallIndex - 1 || 0;

    const leftCollision = isTrianglePolylineCollision(
      dronePosition,
      left.slice(startIndex, wallIndex + 3),
    );

    const rightCollision = isTrianglePolylineCollision(
      dronePosition,
      right.slice(startIndex, wallIndex + 3),
    );

    return leftCollision || rightCollision;
  },
);
