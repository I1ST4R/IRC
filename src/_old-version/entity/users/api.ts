import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, register, checkAuth, logout, getUser } from '../../services/api';
import { cartApi } from '../cart/api';
import { likedApi } from '../liked/api';
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
    logout: build.mutation<User, void>({
      queryFn: () =>
        logout()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Очистить кэш корзины и избранного при выходе пользователя
          dispatch(cartApi.util.resetApiState());
          dispatch(likedApi.util.resetApiState());
        }
      },
    }),
    getUser: build.query<User, void>({
      queryFn: () =>
        getUser()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['User'],
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
  useCheckAuthQuery,
  useLogoutMutation,
  useGetUserQuery
} = usersApi;