import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  validateCertificate
} from '../../services/api';
import { Certificate } from './types';

export const certificateApi = createApi({
  reducerPath: 'certificateApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    validateCertificateCode: build.query<Certificate, string>({
      queryFn: (code) =>
        validateCertificate(code)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
    }),
  }),
});

export const { useValidateCertificateCodeQuery } = certificateApi; 