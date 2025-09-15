import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getOrders, getOrdersByUserId, addOrder } from './orderApi';
import { Order } from './orderTypes';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Order'],
  endpoints: (build) => ({
    getOrders: build.query<Order[], void>({
      queryFn: () =>
        getOrders()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Order'],
    }),
    getOrdersByUserId: build.query<Order[], string>({
      queryFn: (userId) =>
        getOrdersByUserId(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Order'],
    }),
    addOrder: build.mutation<Order, Order>({
      queryFn: (order) =>
        addOrder(order)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersByUserIdQuery,
  useAddOrderMutation,
} = orderApi;