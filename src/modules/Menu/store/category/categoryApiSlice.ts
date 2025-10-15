import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCategories } from './categoryApi';
import { Category } from './categoryTypes';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      queryFn: () =>
        getCategories()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
  }),
});


export const { useGetCategoriesQuery } = categoryApi;