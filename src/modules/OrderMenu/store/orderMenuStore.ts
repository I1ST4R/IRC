import { configureStore } from "@reduxjs/toolkit";
import { CartTotalsState } from "./cartTotals/cartTotalsTypes";
import cartTotalsReducer from "./cartTotals/cartTotalsSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const orderMenuStore = configureStore({
  reducer: {
    cartTotals: cartTotalsReducer,
  }
})

export type RootState = {
  cartTotals: CartTotalsState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;