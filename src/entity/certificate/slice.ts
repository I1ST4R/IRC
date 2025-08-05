import { createSlice} from '@reduxjs/toolkit';
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
  }
});

export const { clearCertificate } = certificateSlice.actions;
export default certificateSlice.reducer; 