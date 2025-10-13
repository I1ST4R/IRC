import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUser, login, logout, register} from './userApi'
import { likedApi } from '../../../modules/LikedBody/store/liked/likedApiSlice'
import { User, LoginData, RegisterData } from './userTypes'
import { cartApi } from '@/modules/CartBody/store/cart/cartApiSlice';
import { rootReducer } from '@/App/store';

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

rootReducer.inject(usersApi);

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery
} = usersApi;