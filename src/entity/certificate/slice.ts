import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateCertificate } from '@/services/api';
import { CertificateState } from './types'


const initialState: CertificateState = {
  certificate: {
    id: null,
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

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    clearCertificate: (state) => {
      state.certificate.id = null;
      state.certificate.code = null;
      state.certificate.amount = null;
      state.certificate.valid = false;
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
        state.certificate.id = action.payload.id;
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

export const { clearCertificate } = certificateSlice.actions;
export default certificateSlice.reducer; 