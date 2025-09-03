import { configureStore } from "@reduxjs/toolkit";
import { promoApi } from "./promo/api";
import { certificateApi } from "./certificate/api";

export const orderMenuStore = configureStore({
  reducer: {
    [promoApi.reducerPath]: promoApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(promoApi.middleware)
    .concat(certificateApi.middleware),
})