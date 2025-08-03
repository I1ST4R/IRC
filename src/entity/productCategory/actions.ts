import { CategoryActionTypes } from './types';
import { getCategories } from '../../services/api';
import { Category } from './types';

// Action creators
const fetchCategoriesRequest = () => ({ 
  type: CategoryActionTypes.FETCH_CATEGORIES_REQUEST as const 
});

const fetchCategoriesSuccess = (categories: Category[]) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS as const,
  payload: categories
});

const fetchCategoriesFailure = (error: string) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE as const,
  payload: error
});

// Thunk actions
export const fetchCategories = () => {
  return async (dispatch: any) => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await getCategories();
      dispatch(fetchCategoriesSuccess(response));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 