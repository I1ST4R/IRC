
import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';

const initialState: UserState = {
  id: null,
  login: null,
  email: null,
  password: null,
  type: null,
  cart: [],
  liked: [],
  isAccountOpen: false,
  loading: 'idle',
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.login = null;
      state.email = null;
      state.type = null;
      state.cart = [];
      state.liked = [];
      localStorage.removeItem('userId');
    },
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    openAccount: (state) => {
      state.isAccountOpen = true
    },
    closeAccount: (state) => {
      state.isAccountOpen = false
    }
  },
});

export const { logout, clearError, openAccount, closeAccount, setUser } = usersSlice.actions;
export default usersSlice.reducer;