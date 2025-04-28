// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/users.slice.ts';
import productReducer from './products/products.slice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer
    // другие редьюсеры
  },
});

// Типы для работы с хранилищем
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;