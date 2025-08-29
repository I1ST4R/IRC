// certificates/slice.ts
import { PayloadAction } from '@reduxjs/toolkit';
import { CertificateState, Certificate } from './types';
import { createEntityModule } from '@/shared/entityFactory';
import { validateCertificate } from '@/services/api';

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

const certificateModule = createEntityModule<string, Certificate, CertificateState>({
  sliceName: 'certificates',
  initialState,
  requestActionName: 'validateCertificateRequest',
  actionNames: {
    request: 'validateCertificateRequest',
    success: 'validateCertificateSuccess',
    failure: 'validateCertificateFailure',
    clear: 'clearCertificate'
  },
  onRequest: (state, _action: PayloadAction<string>) => {
    state.loading = 'pending';
    state.error = null;
  },
  onSuccess: (state, action: PayloadAction<Certificate>) => {
    state.loading = 'succeeded';
    state.certificate = action.payload;
    state.error = null;
  },
  onFailure: (state, action: PayloadAction<string>) => {
    state.loading = 'failed';
    state.error = action.payload;
  },
  onClear: (state) => {
    state.certificate.id = null;
    state.certificate.code = null;
    state.certificate.amount = null;
    state.certificate.valid = false;
    state.error = null;
  },
  apiCall: validateCertificate
});

const { request: validateCertificateRequest, success: validateCertificateSuccess, failure: validateCertificateFailure, clear: clearCertificate } = certificateModule.actions;

export { clearCertificate, validateCertificateRequest, validateCertificateSuccess, validateCertificateFailure };

export default certificateModule.reducer;
export const certificateSaga = certificateModule.saga;