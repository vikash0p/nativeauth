import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProps} from '../../types';

interface AuthState {
  user: UserProps | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProps | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
