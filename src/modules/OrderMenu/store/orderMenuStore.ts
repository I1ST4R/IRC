import { configureStore } from "@reduxjs/toolkit";
import { promoApi } from "./promo/promoApiSlice";
import { certificateApi } from "./certificate/certificateApiSlice";

export const orderMenuStore = configureStore({
  reducer: {
    [promoApi.reducerPath]: promoApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(promoApi.middleware)
    .concat(certificateApi.middleware),
})