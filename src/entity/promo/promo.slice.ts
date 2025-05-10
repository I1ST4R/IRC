import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { validatePromo } from '../../services/api';

interface PromoState {
  code: string | null;
  discount: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: PromoState = {
  code: null,
  discount: null,
  error: null,
  loading: false
};

export const validatePromoCode = createAsyncThunk(
  'promo/validate',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await validatePromo(code);
      if (response && typeof response === 'object') {
        return response;
      } else {
        return rejectWithValue('Некорректный ответ от сервера');
      }
    } catch (error: any) {
      console.error('Ошибка при проверке промокода:', error, error?.response?.data);
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Ошибка при проверке промокода'
      );
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
          state.code = action.payload.code || (action.meta && action.meta.arg) || null;
          state.discount = action.payload.discount;
          state.error = null;
        } else {
          state.error = action.payload.message || 'Недействительный промокод';
          state.code = null;
          state.discount = null;
        }
      })
      .addCase(validatePromoCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.code = null;
        state.discount = null;
      });
  }
});

export const { clearPromo } = promoSlice.actions;
export default promoSlice.reducer; 