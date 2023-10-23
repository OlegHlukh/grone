import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initUser } from './user-action.ts';
import { User } from 'types';
interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as User,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.token = action.payload.token;
        state.user.id = action.payload.id;
      })
      .addCase(initUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default userSlice.reducer;
export const { addUserName } = userSlice.actions;
