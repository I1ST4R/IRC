
import { createSlice } from '@reduxjs/toolkit';
import { AccountState} from './types';

const initialState: AccountState = {
  isAccountOpen: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    openAccount: (state) => {
      state.isAccountOpen = true
    },
    closeAccount: (state) => {
      state.isAccountOpen = false
    }
  },
});

export const { openAccount, closeAccount} = accountSlice.actions;
export default accountSlice.reducer;