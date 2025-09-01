import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCategories } from '../../services/api';
import { Category } from './types';

export const productCategoryApi = createApi({
  reducerPath: 'productCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['ProductCategory'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      queryFn: () =>
        getCategories()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['ProductCategory'],
    }),
  }),
});

export const { useGetCategoriesQuery } = productCategoryApi;