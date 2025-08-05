import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, register, checkAuth } from '../../services/api';
import { User, LoginData, RegisterData } from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    login: build.mutation<User, LoginData>({
      queryFn: (data) =>
        login(data)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['User'],
    }),
    register: build.mutation<User, RegisterData>({
      queryFn: (data) =>
        register(data)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['User'],
    }),
    checkAuth: build.query<User, string>({
      queryFn: (userId) =>
        checkAuth(userId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckAuthQuery
} = usersApi;