import { FilterParams } from '../productFilter/types';
import { Tag } from '../tag/types';

export interface ProductDb {
  id: string;
  name: string;
  technology: string;
  price: number;
  prevPrice: number;
  quantity: string;
  img: string;
  tags: string[];
  article: string;
  description: string;
  formula: string[];
  for_what: string;
  skin_type: string;
}

export interface Product {
  id: string;
  name: string;
  technology: string;
  price: number;
  prevPrice: number;
  quantity: string;
  img: string;
  tags: Tag[];
  article: string;
  description: string;
  formula: string[];
  for_what: string;
  skin_type: string;
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: FilterParams;
}

export const enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  
  FETCH_PRODUCT_BY_ID_REQUEST = 'FETCH_PRODUCT_BY_ID_REQUEST',
  FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS',
  FETCH_PRODUCT_BY_ID_FAILURE = 'FETCH_PRODUCT_BY_ID_FAILURE',
  
  SET_FILTERS = 'SET_FILTERS',
  RESET_PRODUCTS = 'RESET_PRODUCTS',
}

interface FetchProductsRequestAction {
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: {
    products: Product[];
    hasMore: boolean;
    page: number;
  };
}

interface FetchProductsFailureAction {
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE;
  payload: string;
}

interface FetchProductByIdRequestAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_REQUEST;
}

interface FetchProductByIdSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS;
  payload: Product;
}

interface FetchProductByIdFailureAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_FAILURE;
  payload: string;
}

interface SetFiltersAction {
  type: ProductActionTypes.SET_FILTERS;
  payload: FilterParams;
}

interface ResetProductsAction {
  type: ProductActionTypes.RESET_PRODUCTS;
}

export type ProductActions =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | FetchProductByIdRequestAction
  | FetchProductByIdSuccessAction
  | FetchProductByIdFailureAction
  | SetFiltersAction
  | ResetProductsAction;
