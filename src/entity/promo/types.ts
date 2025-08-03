export interface Promo {
  id: string | null;
  valid: boolean;
  code: string | null;
  discount: number | null;
}

export interface PromoState {
  promo: Promo;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum PromoActionTypes {
  VALIDATE_PROMO_REQUEST = 'VALIDATE_PROMO_REQUEST',
  VALIDATE_PROMO_SUCCESS = 'VALIDATE_PROMO_SUCCESS',
  VALIDATE_PROMO_FAILURE = 'VALIDATE_PROMO_FAILURE',
  
  CHANGE_USED_PROMO_REQUEST = 'CHANGE_USED_PROMO_REQUEST',
  CHANGE_USED_PROMO_SUCCESS = 'CHANGE_USED_PROMO_SUCCESS',
  CHANGE_USED_PROMO_FAILURE = 'CHANGE_USED_PROMO_FAILURE',
  
  CLEAR_PROMO = 'CLEAR_PROMO',
}

interface ValidatePromoRequestAction {
  type: PromoActionTypes.VALIDATE_PROMO_REQUEST;
}

interface ValidatePromoSuccessAction {
  type: PromoActionTypes.VALIDATE_PROMO_SUCCESS;
  payload: Promo;
}

interface ValidatePromoFailureAction {
  type: PromoActionTypes.VALIDATE_PROMO_FAILURE;
  payload: string;
}

interface ChangeUsedPromoRequestAction {
  type: PromoActionTypes.CHANGE_USED_PROMO_REQUEST;
}

interface ChangeUsedPromoSuccessAction {
  type: PromoActionTypes.CHANGE_USED_PROMO_SUCCESS;
  payload: string; // promoId
}

interface ChangeUsedPromoFailureAction {
  type: PromoActionTypes.CHANGE_USED_PROMO_FAILURE;
  payload: string;
}

interface ClearPromoAction {
  type: PromoActionTypes.CLEAR_PROMO;
}

export type PromoActions =
  | ValidatePromoRequestAction
  | ValidatePromoSuccessAction
  | ValidatePromoFailureAction
  | ChangeUsedPromoRequestAction
  | ChangeUsedPromoSuccessAction
  | ChangeUsedPromoFailureAction
  | ClearPromoAction;