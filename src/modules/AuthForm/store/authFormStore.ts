import { configureStore } from "@reduxjs/toolkit";
import  authFormReducer, { AuthFormState }  from "./authFormSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const orderMenuStore = configureStore({
  reducer: {
    authForm: authFormReducer,
  }
})

export type RootState = {
  authForm: AuthFormState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

