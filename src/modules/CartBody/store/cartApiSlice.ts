import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  changeCheckCartItem,
  clearCart
} from './cartApi';
import { Cart, CartWithRecord} from './cartTypes';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    getCart: build.query<CartWithRecord, string>({
      queryFn: (userId) =>
        getCart(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Cart'],
    }),
    getCheckedCartItems: build.query<CartWithRecord, string>({
      queryFn: (userId) =>
        getCart(userId, true)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Cart'],
    }),
    addToCart: build.mutation<Cart, { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        addToCart(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Cart'],
    }),
    updateCartItemQuantity: build.mutation<Cart, { userId: string; productId: string; quantity: number }>({
      queryFn: ({ userId, productId, quantity }) =>
        updateCartItemQuantity(userId, productId, quantity)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: build.mutation<void, { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        removeFromCart(userId, productId)
          .then(() => ({ data: undefined }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Cart'],
    }),
    changeCheckCartItem: build.mutation<Cart, { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        changeCheckCartItem(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Cart'],
    }),
    clearCart: build.mutation<CartWithRecord, { userId: string }>({
      queryFn: ({ userId }) =>
        clearCart(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Cart'],
    })
  }),
})

export const {
  useGetCartQuery,
  useGetCheckedCartItemsQuery,
  useAddToCartMutation,
  useUpdateCartItemQuantityMutation,
  useRemoveFromCartMutation,
  useChangeCheckCartItemMutation,
  useClearCartMutation
} = cartApi; 