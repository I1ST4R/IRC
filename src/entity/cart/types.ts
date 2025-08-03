import { Product } from "../product/types";

export interface CartItemDb {
  productId: string;
  quantity: number;
  isChecked: boolean;
}

export interface CartItem {
  product: Product
  quantity: number;
  isChecked: boolean;
}

export interface CartState {
  items: CartItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  itemsCount: number;
} 


export const enum CartActionTypes {

  FETCH_CART_REQUEST = 'FETCH_CART_REQUEST',
  FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS',
  FETCH_CART_FAILURE = 'FETCH_CART_FAILURE',
  
  ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST',
  ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE',
  
  UPDATE_CART_ITEM_REQUEST = 'UPDATE_CART_ITEM_REQUEST',
  UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS',
  UPDATE_CART_ITEM_FAILURE = 'UPDATE_CART_ITEM_FAILURE',
  
  REMOVE_FROM_CART_REQUEST = 'REMOVE_FROM_CART_REQUEST',
  REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE',
  
  TOGGLE_CHECK_CART_ITEM_REQUEST = 'TOGGLE_CHECK_CART_ITEM_REQUEST',
  TOGGLE_CHECK_CART_ITEM_SUCCESS = 'TOGGLE_CHECK_CART_ITEM_SUCCESS',
  TOGGLE_CHECK_CART_ITEM_FAILURE = 'TOGGLE_CHECK_CART_ITEM_FAILURE',
  
  CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST',
  CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE',
  
  FETCH_CART_TOTALS_REQUEST = 'FETCH_CART_TOTALS_REQUEST',
  FETCH_CART_TOTALS_SUCCESS = 'FETCH_CART_TOTALS_SUCCESS',
  FETCH_CART_TOTALS_FAILURE = 'FETCH_CART_TOTALS_FAILURE',
}

interface FetchCartRequestAction {
  type: CartActionTypes.FETCH_CART_REQUEST;
}

interface FetchCartSuccessAction {
  type: CartActionTypes.FETCH_CART_SUCCESS;
  payload: CartItem[];
}

interface FetchCartFailureAction {
  type: CartActionTypes.FETCH_CART_FAILURE;
  payload: string;
}

interface AddToCartRequestAction {
  type: CartActionTypes.ADD_TO_CART_REQUEST;
}

interface AddToCartSuccessAction {
  type: CartActionTypes.ADD_TO_CART_SUCCESS;
  payload: CartItem[];
}

interface AddToCartFailureAction {
  type: CartActionTypes.ADD_TO_CART_FAILURE;
  payload: string;
}

interface UpdateCartItemRequestAction {
  type: CartActionTypes.UPDATE_CART_ITEM_REQUEST;
}

interface UpdateCartItemSuccessAction {
  type: CartActionTypes.UPDATE_CART_ITEM_SUCCESS;
  payload: CartItem[];
}

interface UpdateCartItemFailureAction {
  type: CartActionTypes.UPDATE_CART_ITEM_FAILURE;
  payload: string;
}

interface RemoveFromCartRequestAction {
  type: CartActionTypes.REMOVE_FROM_CART_REQUEST;
}

interface RemoveFromCartSuccessAction {
  type: CartActionTypes.REMOVE_FROM_CART_SUCCESS;
  payload: string; // productId
}

interface RemoveFromCartFailureAction {
  type: CartActionTypes.REMOVE_FROM_CART_FAILURE;
  payload: string;
}

interface ToggleCheckCartItemRequestAction {
  type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_REQUEST;
}

interface ToggleCheckCartItemSuccessAction {
  type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_SUCCESS;
  payload: CartItem; // обновленный элемент
}

interface ToggleCheckCartItemFailureAction {
  type: CartActionTypes.TOGGLE_CHECK_CART_ITEM_FAILURE;
  payload: string;
}

interface ClearCartRequestAction {
  type: CartActionTypes.CLEAR_CART_REQUEST;
}

interface ClearCartSuccessAction {
  type: CartActionTypes.CLEAR_CART_SUCCESS;
}

interface ClearCartFailureAction {
  type: CartActionTypes.CLEAR_CART_FAILURE;
  payload: string;
}

interface FetchCartTotalsRequestAction {
  type: CartActionTypes.FETCH_CART_TOTALS_REQUEST;
}

interface FetchCartTotalsSuccessAction {
  type: CartActionTypes.FETCH_CART_TOTALS_SUCCESS;
  payload: number; // itemsCount
}

interface FetchCartTotalsFailureAction {
  type: CartActionTypes.FETCH_CART_TOTALS_FAILURE;
  payload: string;
}

export type CartActions =
  | FetchCartRequestAction
  | FetchCartSuccessAction
  | FetchCartFailureAction
  | AddToCartRequestAction
  | AddToCartSuccessAction
  | AddToCartFailureAction
  | UpdateCartItemRequestAction
  | UpdateCartItemSuccessAction
  | UpdateCartItemFailureAction
  | RemoveFromCartRequestAction
  | RemoveFromCartSuccessAction
  | RemoveFromCartFailureAction
  | ToggleCheckCartItemRequestAction
  | ToggleCheckCartItemSuccessAction
  | ToggleCheckCartItemFailureAction
  | ClearCartRequestAction
  | ClearCartSuccessAction
  | ClearCartFailureAction
  | FetchCartTotalsRequestAction
  | FetchCartTotalsSuccessAction
  | FetchCartTotalsFailureAction;