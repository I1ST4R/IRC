import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const rootReducer = combineSlices();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RootState = any;
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()