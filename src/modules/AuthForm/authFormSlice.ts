import { createSlice } from '@reduxjs/toolkit';
import { rootReducer} from '@/App/store';

export type AuthFormState = {
  isFormOpen: boolean
}

const initialState: AuthFormState = { isFormOpen: false }

const authFormSlice = createSlice({
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
}).injectInto(rootReducer)

export const { openAccount, closeAccount } = authFormSlice.actions;
export const { selectIsFormOpen } = authFormSlice.selectors;