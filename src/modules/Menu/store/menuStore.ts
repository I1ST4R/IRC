import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/filterSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FilterState } from "./filter/filterTypes.ts";
import { categoryApi } from "./category/categoryApiSlice.ts";

export const menuStore = configureStore({
  reducer: {
    filter: filterReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware), 
});

export type RootState = {
  filter: FilterState;
};

export type AppDispatch = typeof menuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
