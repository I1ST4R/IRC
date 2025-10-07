import { Order } from '@/modules/OrderMenu';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getOrders } from './orderApi';

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
    })
  }),
});

export const { useGetOrdersQuery } = orderApi;