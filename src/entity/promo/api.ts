import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { validatePromo } from '../../services/api';
import { Promo } from './types';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Promo'],
  endpoints: (build) => ({
    validatePromoCode: build.query<Promo, string>({
      queryFn: (code) =>
        validatePromo(code)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Promo'],
    }),
  }),
});

export const { useValidatePromoCodeQuery } = promoApi;