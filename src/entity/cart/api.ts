import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem } from './types';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    // Получить корзину пользователя
    getCart: build.query<CartItem[], string>({
      query: (userId) => ({
        url: '/users',
        params: { id: userId },
      }),
      // transformResponse: (response) => ... // если нужно преобразовать ответ
      providesTags: ['Cart'],
    }),
    // Добавить товар в корзину
    addToCart: build.mutation<CartItem[], { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/cart/add`,
        method: 'POST',
        body: { userId, productId },
      }),
      invalidatesTags: ['Cart'],
    }),
    // Обновить количество товара в корзине
    updateCartItemQuantity: build.mutation<CartItem[], { userId: string; productId: string; quantity: number }>({
      query: ({ userId, productId, quantity }) => ({
        url: `/cart/update`,
        method: 'PUT',
        body: { userId, productId, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    // Удалить товар из корзины
    removeFromCart: build.mutation<void, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/cart/remove`,
        method: 'DELETE',
        body: { userId, productId },
      }),
      invalidatesTags: ['Cart'],
    }),
    // Изменить статус выбора товара в корзине
    changeCheckCartItem: build.mutation<CartItem, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/cart/check`,
        method: 'PATCH',
        body: { userId, productId },
      }),
      invalidatesTags: ['Cart'],
    }),
    // Очистить корзину
    clearCart: build.mutation<CartItem[], { userId: string }>({
      query: ({ userId }) => ({
        url: `/cart/clear`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Cart'],
    }),
    // Получить количество товаров в корзине
    getCartTotals: build.query<number, string>({
      query: (userId) => ({
        url: '/cart/totals',
        params: { userId },
      }),
      providesTags: ['Cart'],
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