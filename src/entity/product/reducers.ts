import { ProductActionTypes } from './types';
import { ProductsState, ProductActions, Product } from './types';
import { FilterParams } from '../productFilter/types';

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: 'idle',
  error: null,
  hasMore: true,
  currentPage: 1,
  filters: {
    priceRange: {
      min: 0,
      max: 10000
    },
    tagsId: []
  }
};

export const productReducer = (
  state = initialState,
  action: ProductActions
): ProductsState => {
  switch (action.type) {
    // Загрузка продуктов
    case ProductActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      const { products, hasMore, page } = action.payload;
      return {
        ...state,
        loading: 'succeeded',
        items: page === 1 
          ? products 
          : [...state.items, ...products.filter(
              (product: Product) => !state.items.some(item => item.id === product.id)
            )],
        hasMore,
        currentPage: page,
        error: null
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    // Загрузка продукта по ID
    case ProductActionTypes.FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: 'pending',
        currentProduct: null,
        error: null
      };
    case ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      const product = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.id === product.id);
      const updatedItems = existingProductIndex === -1 
        ? [...state.items, product]
        : state.items.map((item, index) => index === existingProductIndex ? product : item);
      
      return {
        ...state,
        loading: 'succeeded',
        currentProduct: product,
        items: updatedItems,
        error: null
      };
    case ProductActionTypes.FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: 'failed',
        currentProduct: null,
        error: action.payload
      };

    // Установка фильтров
    case ProductActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
        currentPage: 1,
        items: []
      };

    // Сброс продуктов
    case ProductActionTypes.RESET_PRODUCTS:
      return {
        ...state,
        items: [],
        currentPage: 1,
        hasMore: true
      };

    default:
      return state;
  }
}; 