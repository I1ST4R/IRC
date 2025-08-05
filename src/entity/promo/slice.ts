import { createSlice } from '@reduxjs/toolkit';
import { PromoState } from '../promo/types'

const initialState: PromoState = {
  promo: {
    id: null,
    valid: false,
    code: null,
    discount: null,
  },
  loading: 'idle',
  error: null
};

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    clearPromo: (state) => {
      state.promo.id = null;
      state.promo.code = null;
      state.promo.discount = null;
      state.promo.valid = false;
      state.error = null;
    }
  },
});

export const { clearPromo } = promoSlice.actions;
export default promoSlice.reducer; 