import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../../Menu/store/productFilter/productFilterSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FilterState } from "../../Menu/store/productFilter/productFilterTypes.ts";

export const orderMenuStore = configureStore({
  reducer: {filter: filterReducer},
})

export type RootState = {
  filter: FilterState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 