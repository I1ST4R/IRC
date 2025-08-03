import { CartActionTypes } from './types';
import { CartState, CartActions } from './types';

const initialState: CartState = {
  items: [],
  loading: 'idle',
  error: null,
  itemsCount: 0
};

export const cartReducer = (
  state = initialState,
  action: CartActions
): CartState => {
  switch (action.type) {
    // Загрузка корзины
    case CartActionTypes.FETCH_CART_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case CartActionTypes.FETCH_CART_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Добавление в корзину
    case CartActionTypes.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case CartActionTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Обновление количества
    case CartActionTypes.UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case CartActionTypes.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Удаление из корзины
    case CartActionTypes.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: state.items.filter(item => item.product.id !== action.payload),
        error: null
      };
    case CartActionTypes.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Переключение isChecked
    case CartActionTypes.TOGGLE_CHECK_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.TOGGLE_CHECK_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: state.items.map(item => 
          item.product.id === action.payload.product.id ? action.payload : item
        ),
        error: null
      };
    case CartActionTypes.TOGGLE_CHECK_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Очистка корзины
    case CartActionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: [],
        error: null,
        itemsCount: 0
      };
    case CartActionTypes.CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Получение количества товаров
    case CartActionTypes.FETCH_CART_TOTALS_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CartActionTypes.FETCH_CART_TOTALS_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        itemsCount: action.payload,
        error: null
      };
    case CartActionTypes.FETCH_CART_TOTALS_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    default:
      return state;
  }
};