import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateCertificate } from '@/services/api';

interface CertificateState {
  code: string | null;
  amount: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  code: null,
  amount: null,
  loading: false,
  error: null
};

export const validateCertificateCode = createAsyncThunk(
  'certificates/validate',
  async (code: string) => {
    try {
      const result = await validateCertificate(code);
      return result;
    } catch (error) {
      console.error('Error validating certificate:', error);
      throw error;
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
          state.code = action.payload.code;
          state.amount = action.payload.amount;
          state.error = null;
        } else {
          state.error = 'Неверный сертификат';
        }
      })
      .addCase(validateCertificateCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при проверке сертификата';
      });
  }
});

export const { clearCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer; 