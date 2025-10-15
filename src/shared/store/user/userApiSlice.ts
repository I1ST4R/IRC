import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUser, login, logout, register } from "./userApi";
import { User, LoginData, RegisterData } from "./userTypes";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    login: build.mutation<User, LoginData>({
      queryFn: (data) =>
        login(data)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ["User"],
    }),
    logout: build.mutation<User, void>({
      queryFn: () =>
        logout()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ["User"],
    }),
    getUser: build.query<User, void>({
      queryFn: () =>
        getUser()
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ["User"],
    }),
    register: build.mutation<User, RegisterData>({
      queryFn: (data) =>
        register(data)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
} = usersApi;
