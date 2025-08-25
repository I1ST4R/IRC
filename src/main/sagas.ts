// store/sagas.ts
import { all } from 'redux-saga/effects';
import { promoSaga } from '../entity/promo/saga';
import { certificateSaga } from '../entity/certificate/saga';
import { tagsSaga } from '../entity/tag/saga';

export function* rootSaga() {
  yield all([
    promoSaga(),
    certificateSaga(),
    tagsSaga(),
  ]);
}