
import { configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
//Reducers
import productsReducer from '../entity/product/slice.ts';
import filterReducer from '../entity/productFilter/slice.ts';
import likedReducer from '../entity/liked/slice.ts';
import accountReducer from '../entity/account/slice.ts';
import ordersReducer from '../entity/order/slice.ts';
// APIs
import { cartApi } from '../entity/cart/api.ts';
import { certificateApi } from '../entity/certificate/api.ts';
import { likedApi } from '../entity/liked/api.ts';
import { orderApi } from '../entity/order/api.ts';
import { productApi } from '../entity/product/api.ts';
import { productCategoryApi } from '../entity/productCategory/api.ts';
import { promoApi } from '../entity/promo/api.ts';
import { tagApi } from '../entity/tag/api.ts';
import { usersApi } from '../entity/users/api.ts';
//State Interface
import { LikedState } from '../entity/liked/types.ts'
import { FilterState } from '../entity/productFilter/types.ts'
import { ProductsState } from '../entity/product/types.ts'
import { OrdersState } from '../entity/order/types.ts';
import { AccountState } from '@/entity/account/types.ts';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    liked: likedReducer,
    account: accountReducer,
    orders: ordersReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [likedApi.reducerPath]: likedApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productCategoryApi.reducerPath]: productCategoryApi.reducer,
    
    [tagApi.reducerPath]: tagApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware)
    .concat(certificateApi.middleware)
    .concat(likedApi.middleware)
    .concat(orderApi.middleware)
    .concat(productApi.middleware)
    .concat(productCategoryApi.middleware)
    .concat(promoApi.middleware)
    .concat(tagApi.middleware)
    .concat(usersApi.middleware),
});

export type RootState = {
  products: ProductsState;
  filter: FilterState;
  liked: LikedState;
  account: AccountState;
  orders: OrdersState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 