import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./cart/cartApiSlice";

export const cartListStore = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware)
})