// store/sagas.ts
import { all } from 'redux-saga/effects';
import { promoSaga } from '../entity/promo/slice';
import { certificateSaga } from '../entity/certificate/slice';
import { tagsSaga } from '../entity/tag/slice';

export function* rootSaga() {
  yield all([
    promoSaga(),
    certificateSaga(),
    tagsSaga(),
  ]);
}