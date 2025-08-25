import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
import { validatePromo } from '@/services/api';
import { 
  validatePromoSuccess, 
  validatePromoFailure 
} from './slice';
import type { Promo } from './types';

interface ValidatePromoAction {
  type: string;
  payload: string;
}

// Точные типы эффектов для worker саги
type ValidatePromoEffects =
  | CallEffect<Promo> // call возвращает Promo
  | PutEffect<{ type: string; payload: Promo }> // для validatePromoSuccess
  | PutEffect<{ type: string; payload: string }>; // для validatePromoFailure

// Точный тип для worker саги
type ValidatePromoSaga = Generator<ValidatePromoEffects, void, Promo>;

// Точный тип для watcher саги
type PromoWatcherSaga = Generator<ForkEffect, void, unknown>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    return error;
  }
  return 'Неизвестная ошибка при проверке промокода';
}

function* validatePromoSaga(action: ValidatePromoAction): ValidatePromoSaga {
  try {
    const result: Promo = yield call(validatePromo, action.payload);
    yield put(validatePromoSuccess(result));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error validating promo:', error);
    yield put(validatePromoFailure(errorMessage));
  }
}

export function* promoSaga(): PromoWatcherSaga {
  yield takeEvery('promo/validatePromoRequest', validatePromoSaga);
}