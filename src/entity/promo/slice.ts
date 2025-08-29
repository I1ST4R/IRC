import { PayloadAction } from '@reduxjs/toolkit';
import { PromoState, Promo } from './types';
import { createEntityModule } from '@/shared/entityFactory';
import { validatePromo } from '@/services/api';

const initialState: PromoState = {
  promo: {
    id: null,
    valid: false,
    code: null,
    discount: null,
  },
  loading: 'idle',
  error: null
};

const promoModule = createEntityModule<string, Promo, PromoState>({
  sliceName: 'promo',
  initialState,
  requestActionName: 'validatePromoRequest',
  actionNames: {
    request: 'validatePromoRequest',
    success: 'validatePromoSuccess',
    failure: 'validatePromoFailure',
    clear: 'clearPromo'
  },
  onRequest: (state, _action: PayloadAction<string>) => {
    state.loading = 'pending';
    state.error = null;
  },
  onSuccess: (state, action: PayloadAction<Promo>) => {
    state.loading = 'succeeded';
    state.promo = action.payload;
    state.error = null;
  },
  onFailure: (state, action: PayloadAction<string>) => {
    state.loading = 'failed';
    state.error = action.payload;
  },
  onClear: (state) => {
    state.promo.id = null;
    state.promo.code = null;
    state.promo.discount = null;
    state.promo.valid = false;
    state.error = null;
  },
  apiCall: validatePromo
});

const { request: validatePromoRequest, success: validatePromoSuccess, failure: validatePromoFailure, clear: clearPromo } = promoModule.actions;

export { clearPromo, validatePromoRequest, validatePromoSuccess, validatePromoFailure };

export default promoModule.reducer;
export const promoSaga = promoModule.saga;