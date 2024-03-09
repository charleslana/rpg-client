import userCharactersSlice from './userCharactersSlice';
import userSlice from './userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userSlice,
    userCharacters: userCharactersSlice,
  },
});
