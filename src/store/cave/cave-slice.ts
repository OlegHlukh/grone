import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseState, Polyline } from 'types';
import { SERVER_CANVAS_WIDTH } from '../../config/constants.ts';

interface CaveState extends BaseState {
  cave: Polyline;
  isFinished: boolean;
  wallIndex: number;
  caveWidth: number;
  polyline: {
    left: Polyline;
    right: Polyline;
  };
  wallHeight: number;
}

const initialState: CaveState = {
  isFinished: false,
  loading: false,
  cave: [],
  caveWidth: 1000,
  error: null,
  wallIndex: 0,
  wallHeight: 10,
  polyline: {
    left: [],
    right: [],
  },
};

const caveSlice = createSlice({
  name: 'cave',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setCaveWidth: (state, action: PayloadAction<number>) => {
      state.caveWidth = action.payload;
    },
    addCavePoints: (state, action: PayloadAction<number[][]>) => {
      const multiplayer = Math.round(state.caveWidth / SERVER_CANVAS_WIDTH);

      const startIndex = state.polyline.left.length;

      action.payload.forEach((el, index) => {
        const polyline = generatePolyline({
          y: (index + startIndex) * state.wallHeight,
          points: el,
          canvasWidth: state.caveWidth,
          multiplayer,
        });

        state.polyline.left.push(polyline.left);
        state.polyline.right.push(polyline.right);
      });

      state.cave.push(...action.payload);
    },
    finishLoading: (state) => {
      state.isFinished = true;
    },
    updateWallIndex: (state, action: PayloadAction<number>) => {
      state.wallIndex = action.payload;
    },
    setWallHeight: (state, action: PayloadAction<number>) => {
      state.wallHeight = action.payload;
    },
    resetCaveState: (state) => {
      return {
        ...initialState,
        caveWidth: state.caveWidth,
      };
    },
  },
});

export const {
  startLoading,
  finishLoading,
  addCavePoints,
  updateWallIndex,
  resetCaveState,
  setCaveWidth,
  setWallHeight,
} = caveSlice.actions;
export default caveSlice.reducer;

interface GeneratePolylineProps {
  y: number;
  canvasWidth: number;
  multiplayer: number;
  points: number[];
}

const generatePolyline = ({
  y,
  points,
  canvasWidth,
  multiplayer,
}: GeneratePolylineProps) => {
  console.log(points, y);

  const [leftPoint, rightPoint] = points;

  const centerOfCanvas = Math.round(canvasWidth / 2);

  const leftX = centerOfCanvas + leftPoint * multiplayer;
  const rightX = centerOfCanvas - rightPoint * multiplayer;

  const leftPolyline = [leftX, y];
  const rightPolyline = [canvasWidth - rightX, y];

  return {
    left: leftPolyline,
    right: rightPolyline,
  };
};
