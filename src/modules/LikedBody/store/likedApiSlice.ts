import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getLiked,
  addToLiked,
  removeFromLiked
} from './likedApi';
import { ProductT } from '@/modules/ProductList';


export const likedApi = createApi({
  reducerPath: 'likedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Liked'],
  endpoints: (build) => ({
    getLiked: build.query<ProductT[], string>({
      queryFn: (userId) =>
        getLiked(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Liked'],
    }),
    addToLiked: build.mutation<ProductT[], { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        addToLiked(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Liked'],
    }),
    removeFromLiked: build.mutation<ProductT[], { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        removeFromLiked(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Liked'],
    }),
  }),
});

export const {
  useGetLikedQuery,
  useAddToLikedMutation,
  useRemoveFromLikedMutation
} = likedApi; 