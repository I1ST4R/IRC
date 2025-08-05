import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  calculateCartTotals,
  changeCheckCartItem,
  clearCart
} from '../../services/api';
import { CartItem } from './types';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getCart: build.query<CartItem[], string>({
      queryFn: (userId) =>
        getCart(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
    addToCart: build.mutation<CartItem[], { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        addToCart(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
    updateCartItemQuantity: build.mutation<CartItem[], { userId: string; productId: string; quantity: number }>({
      queryFn: ({ userId, productId, quantity }) =>
        updateCartItemQuantity(userId, productId, quantity)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
    removeFromCart: build.mutation<void, { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        removeFromCart(userId, productId)
          .then(() => ({ data: undefined }))
          .catch((error) => ({ error })),
    }),
    changeCheckCartItem: build.mutation<CartItem, { userId: string; productId: string }>({
      queryFn: ({ userId, productId }) =>
        changeCheckCartItem(userId, productId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
    clearCart: build.mutation<CartItem[], { userId: string }>({
      queryFn: ({ userId }) =>
        clearCart(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
    getCartTotals: build.query<number, string>({
      queryFn: (userId) =>
        calculateCartTotals(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemQuantityMutation,
  useRemoveFromCartMutation,
  useChangeCheckCartItemMutation,
  useClearCartMutation,
  useGetCartTotalsQuery
} = cartApi; 