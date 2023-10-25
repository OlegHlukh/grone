import axios from 'axios';
import { INIT_URL, BASE_URL } from './config.ts';
import type { UserInitBody } from './types.ts';

const TOKEN_CHUNK_SIZE = 4;
const START_TOKEN_CHUNK = 1;

interface AuthResponse {
  no: number;
  chunk: string;
}

const user = {
  initUser: async (body: UserInitBody) => {
    const response = await axios.post<{ id: string }>(
      INIT_URL,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed in user init');
    }

    return response.data;
  },
  authUser: async (userId: string) => {
    const tokenPromises = generateArray(
      TOKEN_CHUNK_SIZE,
      START_TOKEN_CHUNK,
    ).map((index) => {
      return axios.get<AuthResponse>(`${BASE_URL}/token/${index}?id=${userId}`);
    });

    const results = await Promise.all(tokenPromises);

    return results
      .map((result) => {
        if (result.status !== 200) {
          throw new Error('Token init failed');
        }

        return result.data;
      })
      .sort((a, b) => a.no - b.no)
      .map((el) => el.chunk)
      .join('');
  },
};

export default user;

const generateArray = (size: number, start: number) =>
  Array.from({ length: size }, (_, index) => index + start);
