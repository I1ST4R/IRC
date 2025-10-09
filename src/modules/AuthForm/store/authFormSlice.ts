import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './authFormStore';

export type AuthFormState = {
  isFormOpen: boolean
}

const initialState: AuthFormState = { isFormOpen: false }

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    openAccount: (state) => {
      state.isFormOpen = true
    },
    closeAccount: (state) => {
      state.isFormOpen = false
    }
  },
});

export const selectIsFormOpen = (state: RootState) => state.authForm.isFormOpen
export const { openAccount, closeAccount} = authFormSlice.actions;
export default authFormSlice.reducer;

