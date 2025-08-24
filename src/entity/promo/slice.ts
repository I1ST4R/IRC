import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PromoState, Promo } from './types';

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
    },
    
    validatePromoRequest: (state, action: PayloadAction<string>) => {
      state.loading = 'pending';
      state.error = null;
    },
    
    validatePromoSuccess: (state, action: PayloadAction<Promo>) => {
      state.loading = 'succeeded';
      state.promo = action.payload;
      state.error = null;
    },
    
    validatePromoFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    }
  }
});

export const { 
  clearPromo, 
  validatePromoRequest, 
  validatePromoSuccess, 
  validatePromoFailure 
} = promoSlice.actions;

export default promoSlice.reducer;