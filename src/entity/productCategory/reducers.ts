import { CategoryActionTypes } from './types';
import { CategoriesState, CategoryActions } from './types';

const initialState: CategoriesState = {
  categories: [],
  loading: 'idle',
  error: null
};

export const categoryReducer = (
  state = initialState,
  action: CategoryActions
): CategoriesState => {
  switch (action.type) {
    // Загрузка категорий
    case CategoryActionTypes.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        categories: action.payload,
        error: null
      };
    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    default:
      return state;
  }
}; 