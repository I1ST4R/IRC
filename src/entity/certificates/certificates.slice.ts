import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { validateCertificate } from '../../services/api';

interface CertificateState {
  code: string | null;
  amount: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: CertificateState = {
  code: null,
  amount: null,
  error: null,
  loading: false
};

export const validateCertificateCode = createAsyncThunk(
  'certificates/validate',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await validateCertificate(code);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при проверке сертификата');
    }
  }
);

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    clearCertificate: (state) => {
      state.code = null;
      state.amount = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCertificateCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCertificateCode.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.valid) {
          state.code = action.payload.code || (action.meta && action.meta.arg) || null;
          state.amount = action.payload.amount;
          state.error = null;
        } else {
          state.error = action.payload.message || 'Недействительный сертификат';
          state.code = null;
          state.amount = null;
        }
      })
      .addCase(validateCertificateCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.code = null;
        state.amount = null;
      });
  }
});

export const { clearCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer; 