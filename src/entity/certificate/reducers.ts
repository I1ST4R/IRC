import { CertificateActionTypes } from './types';
import { CertificateState, CertificateActions } from './types';

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

export const certificateReducer = (
  state = initialState,
  action: CertificateActions
): CertificateState => {
  switch (action.type) {
    // Валидация сертификата
    case CertificateActionTypes.VALIDATE_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CertificateActionTypes.VALIDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        certificate: action.payload,
        error: null
      };
    case CertificateActionTypes.VALIDATE_CERTIFICATE_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Отметка сертификата как использованного
    case CertificateActionTypes.CHANGE_USED_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CertificateActionTypes.CHANGE_USED_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        certificate: {
          ...state.certificate,
          valid: false // После использования сертификат становится недействительным
        },
        error: null
      };
    case CertificateActionTypes.CHANGE_USED_CERTIFICATE_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Очистка сертификата
    case CertificateActionTypes.CLEAR_CERTIFICATE:
      return {
        ...state,
        certificate: {
          id: null,
          valid: false,
          code: null,
          amount: null,
        },
        error: null
      };

    default:
      return state;
  }
}; 