import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getProducts, getProductById } from './productApi';
import { Product } from './productTypes';
import { rootReducer } from '@/App/store';
import { FilterParams } from '@/modules/Menu';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<{ products: Product[]; hasMore: boolean }, { page: number; filter?: FilterParams }>({
      queryFn: ({ page, filter }) =>
        getProducts(page, filter)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Product'],
    }),
    getProductById: build.query<Product, string>({
      queryFn: (id) =>
        getProductById(id)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Product'],
    }),
  }),
})

rootReducer.inject(productApi);

export const {
  useGetProductsQuery,
  useGetProductByIdQuery
} = productApi; 