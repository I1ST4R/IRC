import { usersApi } from '@/shared/store/user/userApiSlice';
import { orderApi } from '@/modules/OrderTable/store/orderApiSlice';
import { productApi } from '@/modules/ProductList/store/product/productApiSlice';
import { tagApi } from '@/modules/ProductList/store/tag/tagApiSlice';
import { likedApi } from '@/modules/LikedBody/store/likedApiSlice';
import { categoryApi } from '@/modules/Menu/store/category/categoryApiSlice';
import { cartApi } from '@/modules/CartBody/store/cartApiSlice';

import { authFormSlice } from '@/modules/AuthForm/authFormSlice';
import { filterSlice } from '@/modules/Menu/store/filter/filterSlice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartTotalsSlice } from '@/modules/OrderMenu/store/cartTotals/cartTotalsSlice';
import { recipientSlice } from '@/modules/OrderForm/store/recipientSlice';


export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    authForm: authFormSlice.reducer,
    cartTotals: cartTotalsSlice.reducer,
    recipient: recipientSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer, 
    [likedApi.reducerPath]: likedApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware() 
      .concat(usersApi.middleware)
      .concat(productApi.middleware)
      .concat(likedApi.middleware)
      .concat(categoryApi.middleware)
      .concat(orderApi.middleware)
      .concat(tagApi.middleware)
      .concat(cartApi.middleware)
});

export type RootState = any;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

