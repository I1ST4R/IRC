import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUser } from './api/getUser'
import { login } from './api/login'
import { logout } from './api/logout'
import { register } from './api/register'
import { cartApi } from '../cart/api'
import { likedApi } from '../liked/api'
import { User, LoginData, RegisterData } from './userTypes'

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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery
} = usersApi;