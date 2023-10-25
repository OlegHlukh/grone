import { RootState } from '../store.ts';

export const getPolyline = (state: RootState) => state.cave.polyline;
export const getWallIndex = (state: RootState) => state.cave.wallIndex;
