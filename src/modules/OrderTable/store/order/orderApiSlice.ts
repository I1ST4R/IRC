import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getOrders, OrderRecord } from './orderApi';
import { rootReducer } from '@/App/store';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Order'],
  endpoints: (build) => ({
    getOrders: build.query<OrderRecord, void>({
      queryFn: () =>
        getOrders()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Order'],
    })
  }),
});

rootReducer.inject(orderApi);

export const { useGetOrdersQuery } = orderApi;