import { LikedActionTypes } from './types';
import { LikedState, LikedActions } from './types';

const initialState: LikedState = {
  items: [],
  loading: 'idle',
  error: null
};

export const likedReducer = (
  state = initialState,
  action: LikedActions
): LikedState => {
  switch (action.type) {
    // Загрузка избранного
    case LikedActionTypes.FETCH_LIKED_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case LikedActionTypes.FETCH_LIKED_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case LikedActionTypes.FETCH_LIKED_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Добавление в избранное
    case LikedActionTypes.ADD_TO_LIKED_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case LikedActionTypes.ADD_TO_LIKED_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case LikedActionTypes.ADD_TO_LIKED_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Удаление из избранного
    case LikedActionTypes.REMOVE_FROM_LIKED_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case LikedActionTypes.REMOVE_FROM_LIKED_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        items: action.payload,
        error: null
      };
    case LikedActionTypes.REMOVE_FROM_LIKED_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Очистка при выходе
    case LikedActionTypes.CLEAR_LIKED_ON_LOGOUT:
      return {
        ...state,
        items: [],
        loading: 'succeeded',
        error: null
      };

    default:
      return state;
  }
}; 