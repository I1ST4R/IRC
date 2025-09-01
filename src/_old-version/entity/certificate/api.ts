import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getCertificate,
  validateCertificate
} from '../../services/api';
import { Certificate } from './types';

export const certificateApi = createApi({
  reducerPath: 'certificateApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Certificate'],
  endpoints: (build) => ({
    validateCertificateCode: build.mutation<Certificate, string>({
      queryFn: (code) =>
        validateCertificate(code)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['Certificate'],
    }),
    getCertificateCode: build.query<Certificate, void>({
      queryFn: () =>
        getCertificate()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Certificate'],
    }),
  }),
});

export const { 
  useValidateCertificateCodeMutation, 
  useGetCertificateCodeQuery,
} = certificateApi; 