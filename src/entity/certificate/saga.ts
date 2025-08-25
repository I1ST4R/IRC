import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
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

// Точные типы эффектов для worker саги
type ValidateCertificateEffects =
  | CallEffect<Certificate> // call возвращает Certificate
  | PutEffect<{ type: string; payload: Certificate }> // для validateCertificateSuccess
  | PutEffect<{ type: string; payload: string }>; // для validateCertificateFailure

// Точный тип для worker саги
type ValidateCertificateSaga = Generator<ValidateCertificateEffects, void, Certificate>;

// Точный тип для watcher саги
type CertificateWatcherSaga = Generator<ForkEffect, void, unknown>;

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

function* validateCertificateSaga(action: ValidateCertificateAction): ValidateCertificateSaga {
  try {
    const result: Certificate = yield call(validateCertificate, action.payload);
    yield put(validateCertificateSuccess(result));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error validating certificate:', error);
    yield put(validateCertificateFailure(errorMessage));
  }
}

export function* certificateSaga(): CertificateWatcherSaga {
  yield takeEvery('certificates/validateCertificateRequest', validateCertificateSaga);
}