// certificates/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CertificateState, Certificate } from './types';

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
    },
    
    // Экшены для саги
    validateCertificateRequest: (state, action: PayloadAction<string>) => {
      state.loading = 'pending';
      state.error = null;
    },
    
    validateCertificateSuccess: (state, action: PayloadAction<Certificate>) => {
      state.loading = 'succeeded';
      state.certificate = action.payload;
      state.error = null;
    },
    
    validateCertificateFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    }
  }
});

export const { 
  clearCertificate, 
  validateCertificateRequest, 
  validateCertificateSuccess, 
  validateCertificateFailure 
} = certificateSlice.actions;

export default certificateSlice.reducer;