import { CartActionTypes } from './types';
import { 
  getCart, 
  addToCart as addToCartApi, 
  updateCartItemQuantity,
  removeFromCart as removeFromCartApi,
  calculateCartTotals,
  changeCheckCartItem as changeCheckCartItemApi,
  clearCart as clearCartApi
} from '../../services/api';
import { CartItem } from './types';

// Action creators
const fetchCartRequest = () => ({ type: CartActionTypes.FETCH_CART_REQUEST as const });
const fetchCartSuccess = (items: CartItem[]) => ({
  type: CartActionTypes.FETCH_CART_SUCCESS as const,
  payload: items
});
const fetchCartFailure = (error: string) => ({
  type: CartActionTypes.FETCH_CART_FAILURE as const,
  payload: error
});

// Thunk actions
export const fetchCart = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(fetchCartRequest());
    try {
      const response = await getCart(userId);
      dispatch(fetchCartSuccess(response));
    } catch (error) {
      dispatch(fetchCartFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const addToCart = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.ADD_TO_CART_REQUEST });
    try {
      const response = await addToCartApi(userId, productId);
      dispatch({
        type: CartActionTypes.ADD_TO_CART_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.ADD_TO_CART_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

export const updateCartItem = (
  userId: string, 
  productId: string, 
  quantity: number
) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.UPDATE_CART_ITEM_REQUEST });
    try {
      const response = await updateCartItemQuantity(userId, productId, quantity);
      dispatch({
        type: CartActionTypes.UPDATE_CART_ITEM_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.UPDATE_CART_ITEM_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

export const removeFromCart = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.REMOVE_FROM_CART_REQUEST });
    try {
      await removeFromCartApi(userId, productId);
      dispatch({
        type: CartActionTypes.REMOVE_FROM_CART_SUCCESS,
        payload: productId
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.REMOVE_FROM_CART_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

export const changeCheckCart = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_REQUEST });
    try {
      const response = await changeCheckCartItemApi(userId, productId);
      dispatch({
        type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

export const clearCart = (userId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.CLEAR_CART_REQUEST });
    try {
      // Предполагаем, что есть API метод для очистки корзины
      await clearCartApi(userId);
      dispatch({ type: CartActionTypes.CLEAR_CART_SUCCESS });
    } catch (error) {
      dispatch({
        type: CartActionTypes.CLEAR_CART_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};

export const fetchCartTotals = (userId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CartActionTypes.FETCH_CART_TOTALS_REQUEST });
    try {
      const totals = await calculateCartTotals(userId);
      dispatch({
        type: CartActionTypes.FETCH_CART_TOTALS_SUCCESS,
        payload: totals
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.FETCH_CART_TOTALS_FAILURE,
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};