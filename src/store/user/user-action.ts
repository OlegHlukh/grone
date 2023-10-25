import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { UserInitBody } from '../../api';
import { User } from '../../types';

type UserWithoutName = Omit<User, 'name'>;

export const initUser = createAsyncThunk<
  UserWithoutName,
  UserInitBody,
  { rejectValue: string }
>('user/init', async function (body, { rejectWithValue }) {
  try {
    const user = await api.user.initUser(body);

    if (!user.id) {
      rejectWithValue('Can not init user');
    }

    const token = await api.user.authUser(user.id);

    return {
      id: user.id,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('Unknown error');
  }
});
