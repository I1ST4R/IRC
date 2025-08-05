import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
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
  }),
});

export const { useValidateCertificateCodeMutation } = certificateApi; 