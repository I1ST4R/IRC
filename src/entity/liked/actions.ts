import { LikedActionTypes } from './types';
import { getLiked, addToLiked, removeFromLiked } from '../../services/api';
import { Product } from '../product/types';

// Action creators
const fetchLikedRequest = () => ({ 
  type: LikedActionTypes.FETCH_LIKED_REQUEST as const 
});

const fetchLikedSuccess = (items: Product[]) => ({
  type: LikedActionTypes.FETCH_LIKED_SUCCESS as const,
  payload: items
});

const fetchLikedFailure = (error: string) => ({
  type: LikedActionTypes.FETCH_LIKED_FAILURE as const,
  payload: error
});

const addToLikedRequest = () => ({ 
  type: LikedActionTypes.ADD_TO_LIKED_REQUEST as const 
});

const addToLikedSuccess = (items: Product[]) => ({
  type: LikedActionTypes.ADD_TO_LIKED_SUCCESS as const,
  payload: items
});

const addToLikedFailure = (error: string) => ({
  type: LikedActionTypes.ADD_TO_LIKED_FAILURE as const,
  payload: error
});

const removeFromLikedRequest = () => ({ 
  type: LikedActionTypes.REMOVE_FROM_LIKED_REQUEST as const 
});

const removeFromLikedSuccess = (items: Product[]) => ({
  type: LikedActionTypes.REMOVE_FROM_LIKED_SUCCESS as const,
  payload: items
});

const removeFromLikedFailure = (error: string) => ({
  type: LikedActionTypes.REMOVE_FROM_LIKED_FAILURE as const,
  payload: error
});

export const clearLikedOnLogout = () => ({
  type: LikedActionTypes.CLEAR_LIKED_ON_LOGOUT as const
});

// Thunk actions
export const fetchLiked = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(fetchLikedRequest());
    try {
      const response = await getLiked(userId);
      dispatch(fetchLikedSuccess(response));
    } catch (error) {
      dispatch(fetchLikedFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const addItemToLiked = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch(addToLikedRequest());
    try {
      await addToLiked(userId, productId);
      const response = await getLiked(userId);
      dispatch(addToLikedSuccess(response));
    } catch (error) {
      dispatch(addToLikedFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const removeItemFromLiked = (userId: string, productId: string) => {
  return async (dispatch: any) => {
    dispatch(removeFromLikedRequest());
    try {
      await removeFromLiked(userId, productId);
      const response = await getLiked(userId);
      dispatch(removeFromLikedSuccess(response));
    } catch (error) {
      dispatch(removeFromLikedFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 