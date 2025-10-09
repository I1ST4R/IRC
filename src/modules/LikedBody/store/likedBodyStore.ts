import { configureStore } from "@reduxjs/toolkit";
import { likedApi } from "./liked/likedApiSlice";

export const cartListStore = configureStore({
  reducer: {
    [likedApi.reducerPath]: likedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(likedApi.middleware)
})