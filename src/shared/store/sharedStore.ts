import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./order/orderSlice";
import {OrderState} from "./order/orderTypes.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersApi } from "./user/userApiSlice.ts";
import { cartApi } from "../../modules/CartList/store/cart/cartApiSlice.ts";
import { likedApi } from "./liked/likedApiSlice.ts";

export const orderMenuStore = configureStore({
  reducer: {
  order: orderReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [likedApi.reducerPath]: likedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware)
    .concat(cartApi.middleware)
    .concat(likedApi.middleware)
})

export type RootState = {
  order: OrderState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 