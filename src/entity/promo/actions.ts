import { PromoActionTypes } from './types';
import { validatePromo, changeUsedPromo } from '../../services/api';
import { Promo } from './types';

// Action creators
const validatePromoRequest = () => ({ 
  type: PromoActionTypes.VALIDATE_PROMO_REQUEST as const 
});

const validatePromoSuccess = (promo: Promo) => ({
  type: PromoActionTypes.VALIDATE_PROMO_SUCCESS as const,
  payload: promo
});

const validatePromoFailure = (error: string) => ({
  type: PromoActionTypes.VALIDATE_PROMO_FAILURE as const,
  payload: error
});

const changeUsedPromoRequest = () => ({ 
  type: PromoActionTypes.CHANGE_USED_PROMO_REQUEST as const 
});

const changeUsedPromoSuccess = (promoId: string) => ({
  type: PromoActionTypes.CHANGE_USED_PROMO_SUCCESS as const,
  payload: promoId
});

const changeUsedPromoFailure = (error: string) => ({
  type: PromoActionTypes.CHANGE_USED_PROMO_FAILURE as const,
  payload: error
});

export const clearPromo = () => ({
  type: PromoActionTypes.CLEAR_PROMO as const
});

// Thunk actions
export const validatePromoCode = (code: string) => {
  return async (dispatch: any) => {
    dispatch(validatePromoRequest());
    try {
      const response = await validatePromo(code);
      dispatch(validatePromoSuccess(response));
    } catch (error) {
      dispatch(validatePromoFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const markPromoAsUsed = (promoId: string) => {
  return async (dispatch: any) => {
    dispatch(changeUsedPromoRequest());
    try {
      await changeUsedPromo(promoId);
      dispatch(changeUsedPromoSuccess(promoId));
    } catch (error) {
      dispatch(changeUsedPromoFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 