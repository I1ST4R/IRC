import { configureStore } from "@reduxjs/toolkit";
import recipientReducer from "./recipientSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RecipientState } from "./recipientTypes";

export const orderMenuStore = configureStore({
  reducer: {
    recipient: recipientReducer,
  }
})

export type RootState = {
  recipient: RecipientState;
};

export type AppDispatch = typeof orderMenuStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

