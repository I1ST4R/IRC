import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeUsedPromo, getPromo, validatePromo } from '../../services/api';
import { Promo } from './types';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Promo'],
  endpoints: (build) => ({
    validatePromoCode: build.mutation<Promo, string>({
      queryFn: (code) =>
        validatePromo(code)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Promo'],
    }),
    changeUsedPromoCode: build.mutation<Promo, string>({
      queryFn: (id) =>
        changeUsedPromo(id)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Promo'],
    }),
    getPromoCode: build.query<Promo, void>({
      queryFn: () =>
        getPromo()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Promo'],
    }),
  }),
});

export const { 
  useValidatePromoCodeMutation,
  useChangeUsedPromoCodeMutation,
  useGetPromoCodeQuery,
 } = promoApi;