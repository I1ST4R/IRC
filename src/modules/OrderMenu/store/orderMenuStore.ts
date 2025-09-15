import { configureStore } from "@reduxjs/toolkit";
import { promoApi } from "./promo/promoApiSlice";
import { certificateApi } from "./certificate/certificateApiSlice";
import { OrderState } from "./order/orderTypes";
import orderReducer from "./order/orderSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const orderMenuStore = configureStore({
  reducer: {
    order: orderReducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(promoApi.middleware)
    .concat(certificateApi.middleware),
})

export type RootState = {
  order: OrderState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;