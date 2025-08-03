import { CertificateActionTypes } from './types';
import { validateCertificate, changeUsedCertificate } from '../../services/api';
import { Certificate } from './types';

// Action creators
const validateCertificateRequest = () => ({ 
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_REQUEST as const 
});

const validateCertificateSuccess = (certificate: Certificate) => ({
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_SUCCESS as const,
  payload: certificate
});

const validateCertificateFailure = (error: string) => ({
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_FAILURE as const,
  payload: error
});

const changeUsedCertificateRequest = () => ({ 
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_REQUEST as const 
});

const changeUsedCertificateSuccess = (certificateId: string) => ({
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_SUCCESS as const,
  payload: certificateId
});

const changeUsedCertificateFailure = (error: string) => ({
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_FAILURE as const,
  payload: error
});

export const clearCertificate = () => ({
  type: CertificateActionTypes.CLEAR_CERTIFICATE as const
});

// Thunk actions
export const validateCertificateCode = (code: string) => {
  return async (dispatch: any) => {
    dispatch(validateCertificateRequest());
    try {
      const response = await validateCertificate(code);
      dispatch(validateCertificateSuccess(response));
    } catch (error) {
      dispatch(validateCertificateFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const markCertificateAsUsed = (certificateId: string) => {
  return async (dispatch: any) => {
    dispatch(changeUsedCertificateRequest());
    try {
      await changeUsedCertificate(certificateId);
      dispatch(changeUsedCertificateSuccess(certificateId));
    } catch (error) {
      dispatch(changeUsedCertificateFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 