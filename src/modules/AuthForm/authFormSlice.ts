import { createSlice } from '@reduxjs/toolkit';

export type AuthFormState = {
  isFormOpen: boolean
}

const initialState: AuthFormState = { isFormOpen: false }

export const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  selectors:{
    selectIsFormOpen: (state) => state.isFormOpen
  },
  reducers: {
    openAccount: (state) => {
      state.isFormOpen = true
    },
    closeAccount: (state) => {
      state.isFormOpen = false
    }
  },
})

export const { openAccount, closeAccount } = authFormSlice.actions;
export const { selectIsFormOpen } = authFormSlice.selectors;