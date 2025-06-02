import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validatePromo } from '@/services/api';
import { PromoState } from '../promo/types'

const initialState: PromoState = {
  code: null,
  discount: null,
  loading: false,
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
      state.code = null;
      state.discount = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validatePromoCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validatePromoCode.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.valid) {
          state.code = action.payload.code;
          state.discount = action.payload.discount;
          state.error = null;
        } else {
          state.error = 'Неверный промокод';
        }
      })
      .addCase(validatePromoCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при проверке промокода';
      });
  }
});

export const { clearPromo } = promoSlice.actions;
export default promoSlice.reducer; 