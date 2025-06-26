import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateCertificate } from '@/services/api';
import { CertificateState } from './types'


const initialState: CertificateState = {
  certificate: {
    valid: false,
    code: null,
    amount: null,
  },
  loading: 'idle',
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
      state.certificate.code = null;
      state.certificate.amount = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCertificateCode.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(validateCertificateCode.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.certificate.valid = action.payload.valid;
        state.certificate.code = action.payload.code;
        state.certificate.amount = action.payload.amount;
        state.error = null;
      })
      .addCase(validateCertificateCode.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Ошибка при проверке сертификата';
      });
  }
});

export const { clearCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer; 