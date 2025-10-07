import { configureStore } from "@reduxjs/toolkit";
import { orderApi } from "./order/orderApiSlice"

export const cartListStore = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware)
})