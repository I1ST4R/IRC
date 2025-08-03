import { ProductActionTypes } from './types';
import { getProducts, getProductById } from '../../services/api';
import { Product } from './types';
import { FilterParams } from '../productFilter/types';

// Action creators
const fetchProductsRequest = () => ({ 
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST as const 
});

const fetchProductsSuccess = (products: Product[], hasMore: boolean, page: number) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS as const,
  payload: {
    products,
    hasMore,
    page
  }
});

const fetchProductsFailure = (error: string) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE as const,
  payload: error
});

const fetchProductByIdRequest = () => ({ 
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_REQUEST as const 
});

const fetchProductByIdSuccess = (product: Product) => ({
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS as const,
  payload: product
});

const fetchProductByIdFailure = (error: string) => ({
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_FAILURE as const,
  payload: error
});

export const setFilters = (filters: FilterParams) => ({
  type: ProductActionTypes.SET_FILTERS as const,
  payload: filters
});

export const resetProducts = () => ({
  type: ProductActionTypes.RESET_PRODUCTS as const
});

// Thunk actions
export const fetchProducts = (page: number, filter?: FilterParams) => {
  return async (dispatch: any) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await getProducts(page, filter);
      dispatch(fetchProductsSuccess(response.products, response.hasMore, page));
    } catch (error) {
      dispatch(fetchProductsFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchProductById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(fetchProductByIdRequest());
    try {
      const response = await getProductById(id);
      dispatch(fetchProductByIdSuccess(response));
    } catch (error) {
      dispatch(fetchProductByIdFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 