

export interface Category {
  id: string;
  name: string;
  tags: string[];
}

export interface CategoriesState {
  categories: Category[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum CategoryActionTypes {
  FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE',
}

interface FetchCategoriesRequestAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_REQUEST;
}

interface FetchCategoriesSuccessAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: Category[];
}

interface FetchCategoriesFailureAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE;
  payload: string;
}

export type CategoryActions =
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction;