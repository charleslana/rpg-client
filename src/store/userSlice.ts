import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserMe } from '../interface/IUser';

interface UserState {
  currentUser: UserMe | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserMe>) => {
      state.currentUser = action.payload;
    },
    clearUser: state => {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
