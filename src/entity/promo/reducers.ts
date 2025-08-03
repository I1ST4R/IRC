import { PromoActionTypes } from './types';
import { PromoState, PromoActions } from './types';

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

export const promoReducer = (
  state = initialState,
  action: PromoActions
): PromoState => {
  switch (action.type) {
    // Валидация промокода
    case PromoActionTypes.VALIDATE_PROMO_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case PromoActionTypes.VALIDATE_PROMO_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        promo: action.payload,
        error: null
      };
    case PromoActionTypes.VALIDATE_PROMO_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Отметка промокода как использованного
    case PromoActionTypes.CHANGE_USED_PROMO_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case PromoActionTypes.CHANGE_USED_PROMO_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        promo: {
          ...state.promo,
          valid: false // После использования промокод становится недействительным
        },
        error: null
      };
    case PromoActionTypes.CHANGE_USED_PROMO_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Очистка промокода
    case PromoActionTypes.CLEAR_PROMO:
      return {
        ...state,
        promo: {
          id: null,
          valid: false,
          code: null,
          discount: null,
        },
        error: null
      };

    default:
      return state;
  }
}; 