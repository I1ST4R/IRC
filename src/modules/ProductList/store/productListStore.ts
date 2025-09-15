import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productApi } from "./product/productApiSlice.ts";
import { tagApi } from "./tag/tagApiSlice.ts";

export const orderMenuStore = configureStore({
  reducer: {
  [productApi.reducerPath]: productApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware)
    .concat(tagApi.middleware)
})

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();