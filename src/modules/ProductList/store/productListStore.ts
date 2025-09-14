import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productApi } from "./product/productApiSlice.ts";
import { tagApi } from "./tag/tagApiSlice.ts";
import { FilterState } from "../../Menu/store/filter/filterTypes.ts";

export const orderMenuStore = configureStore({
  reducer: {
  [productApi.reducerPath]: productApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware)
    .concat(tagApi.middleware)
})

export type RootState = {
  filter: FilterState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 