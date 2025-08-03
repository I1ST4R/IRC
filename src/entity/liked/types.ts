import { Product } from "../product/types";

export interface LikedItemDb {
  productId: string;
}

export interface LikedState {
  items: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum LikedActionTypes {
  FETCH_LIKED_REQUEST = 'FETCH_LIKED_REQUEST',
  FETCH_LIKED_SUCCESS = 'FETCH_LIKED_SUCCESS',
  FETCH_LIKED_FAILURE = 'FETCH_LIKED_FAILURE',
  
  ADD_TO_LIKED_REQUEST = 'ADD_TO_LIKED_REQUEST',
  ADD_TO_LIKED_SUCCESS = 'ADD_TO_LIKED_SUCCESS',
  ADD_TO_LIKED_FAILURE = 'ADD_TO_LIKED_FAILURE',
  
  REMOVE_FROM_LIKED_REQUEST = 'REMOVE_FROM_LIKED_REQUEST',
  REMOVE_FROM_LIKED_SUCCESS = 'REMOVE_FROM_LIKED_SUCCESS',
  REMOVE_FROM_LIKED_FAILURE = 'REMOVE_FROM_LIKED_FAILURE',
  
  CLEAR_LIKED_ON_LOGOUT = 'CLEAR_LIKED_ON_LOGOUT',
}

interface FetchLikedRequestAction {
  type: LikedActionTypes.FETCH_LIKED_REQUEST;
}

interface FetchLikedSuccessAction {
  type: LikedActionTypes.FETCH_LIKED_SUCCESS;
  payload: Product[];
}

interface FetchLikedFailureAction {
  type: LikedActionTypes.FETCH_LIKED_FAILURE;
  payload: string;
}

interface AddToLikedRequestAction {
  type: LikedActionTypes.ADD_TO_LIKED_REQUEST;
}

interface AddToLikedSuccessAction {
  type: LikedActionTypes.ADD_TO_LIKED_SUCCESS;
  payload: Product[];
}

interface AddToLikedFailureAction {
  type: LikedActionTypes.ADD_TO_LIKED_FAILURE;
  payload: string;
}

interface RemoveFromLikedRequestAction {
  type: LikedActionTypes.REMOVE_FROM_LIKED_REQUEST;
}

interface RemoveFromLikedSuccessAction {
  type: LikedActionTypes.REMOVE_FROM_LIKED_SUCCESS;
  payload: Product[];
}

interface RemoveFromLikedFailureAction {
  type: LikedActionTypes.REMOVE_FROM_LIKED_FAILURE;
  payload: string;
}

interface ClearLikedOnLogoutAction {
  type: LikedActionTypes.CLEAR_LIKED_ON_LOGOUT;
}

export type LikedActions =
  | FetchLikedRequestAction
  | FetchLikedSuccessAction
  | FetchLikedFailureAction
  | AddToLikedRequestAction
  | AddToLikedSuccessAction
  | AddToLikedFailureAction
  | RemoveFromLikedRequestAction
  | RemoveFromLikedSuccessAction
  | RemoveFromLikedFailureAction
  | ClearLikedOnLogoutAction;