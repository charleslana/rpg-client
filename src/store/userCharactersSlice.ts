import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserCharacter } from '../interface/IUserCharacter';

interface UserCharacterState {
  userCharacters: IUserCharacter[];
}

const initialState: UserCharacterState = {
  userCharacters: [],
};

export const userCharactersSlice = createSlice({
  name: 'userCharacters',
  initialState,
  reducers: {
    setUserCharacters: (state, action: PayloadAction<IUserCharacter[]>) => {
      state.userCharacters = action.payload;
    },
    clearUserCharacters: state => {
      state.userCharacters = [];
    },
  },
});

export const { setUserCharacters, clearUserCharacters } = userCharactersSlice.actions;

export default userCharactersSlice.reducer;
