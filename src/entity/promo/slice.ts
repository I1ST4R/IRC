import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validatePromo } from '@/services/api';
import { PromoState } from '../promo/types'

const initialState: PromoState = {
  promo: {
    valid: false,
    code: null,
    discount: null,
  },
  loading: 'idle',
  error: null
};

export const validatePromoCode = createAsyncThunk(
  'promo/validate',
  async (code: string) => {
    try {
      const result = await validatePromo(code);
      return result;
    } catch (error) {
      console.error('Error validating promo:', error);
      throw error;
    }
  }
);

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    clearPromo: (state) => {
      state.promo.code = null;
      state.promo.discount = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validatePromoCode.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(validatePromoCode.fulfilled, (state, action) => {
        state.loading = 'succeeded';
          state.promo.valid = action.payload.valid
          state.promo.code = action.payload.code;
          state.promo.discount = action.payload.discount;
          state.error = null;
      })
      .addCase(validatePromoCode.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Ошибка при проверке промокода';
      });
  }
});

export const { clearPromo } = promoSlice.actions;
export default promoSlice.reducer; 