export interface Certificate {
  id: string | null;
  valid: boolean;
  code: string | null;
  amount: number | null;
}

export interface CertificateState {
  certificate: Certificate;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum CertificateActionTypes {
  VALIDATE_CERTIFICATE_REQUEST = 'VALIDATE_CERTIFICATE_REQUEST',
  VALIDATE_CERTIFICATE_SUCCESS = 'VALIDATE_CERTIFICATE_SUCCESS',
  VALIDATE_CERTIFICATE_FAILURE = 'VALIDATE_CERTIFICATE_FAILURE',
  
  CHANGE_USED_CERTIFICATE_REQUEST = 'CHANGE_USED_CERTIFICATE_REQUEST',
  CHANGE_USED_CERTIFICATE_SUCCESS = 'CHANGE_USED_CERTIFICATE_SUCCESS',
  CHANGE_USED_CERTIFICATE_FAILURE = 'CHANGE_USED_CERTIFICATE_FAILURE',
  
  CLEAR_CERTIFICATE = 'CLEAR_CERTIFICATE',
}

interface ValidateCertificateRequestAction {
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_REQUEST;
}

interface ValidateCertificateSuccessAction {
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_SUCCESS;
  payload: Certificate;
}

interface ValidateCertificateFailureAction {
  type: CertificateActionTypes.VALIDATE_CERTIFICATE_FAILURE;
  payload: string;
}

interface ChangeUsedCertificateRequestAction {
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_REQUEST;
}

interface ChangeUsedCertificateSuccessAction {
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_SUCCESS;
  payload: string; // certificateId
}

interface ChangeUsedCertificateFailureAction {
  type: CertificateActionTypes.CHANGE_USED_CERTIFICATE_FAILURE;
  payload: string;
}

interface ClearCertificateAction {
  type: CertificateActionTypes.CLEAR_CERTIFICATE;
}

export type CertificateActions =
  | ValidateCertificateRequestAction
  | ValidateCertificateSuccessAction
  | ValidateCertificateFailureAction
  | ChangeUsedCertificateRequestAction
  | ChangeUsedCertificateSuccessAction
  | ChangeUsedCertificateFailureAction
  | ClearCertificateAction;