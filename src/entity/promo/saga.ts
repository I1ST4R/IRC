// promo/saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { validatePromo } from '@/services/api';
import { 
  validatePromoSuccess, 
  validatePromoFailure 
} from './slice';
import type { Promo, ApiError } from './types';

// Тип для action
interface ValidatePromoAction {
  type: string;
  payload: string;
}

// Вспомогательная функция для обработки ошибок
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

// Worker saga
function* validatePromoSaga(action: ValidatePromoAction): Generator<unknown, void, Promo> {
  try {
    const result: Promo = yield call(validatePromo, action.payload);
    yield put(validatePromoSuccess(result));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error validating promo:', error);
    yield put(validatePromoFailure(errorMessage));
  }
}

// Watcher saga
export function* promoSaga(): Generator<unknown, void, unknown> {
  yield takeEvery('promo/validatePromoRequest', validatePromoSaga);
}