import { call, put, takeEvery } from 'redux-saga/effects';
import { validateCertificate } from '@/services/api';
import { 
  validateCertificateSuccess, 
  validateCertificateFailure 
} from './slice';
import type { Certificate } from './types';

interface ValidateCertificateAction {
  type: string;
  payload: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    return error;
  }
  return 'Ошибка при проверке сертификата';
}

function* validateCertificateSaga(action: ValidateCertificateAction): Generator<unknown, void, Certificate> {
  try {
    const result: Certificate = yield call(validateCertificate, action.payload);
    yield put(validateCertificateSuccess(result));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error validating certificate:', error);
    yield put(validateCertificateFailure(errorMessage));
  }
}

export function* certificateSaga(): Generator<unknown, void, unknown> {
  yield takeEvery('certificates/validateCertificateRequest', validateCertificateSaga);
}