import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
//Reducers
import productsReducer from '../entity/product/slice.ts';
import filterReducer from '../entity/productFilter/slice.ts';
import categoriesReducer from '../entity/productCategory/slice.ts';
import cartReducer from '../entity/cart/slice.ts';
import likedReducer from '../entity/liked/slice.ts';
import userReducer from '../entity/users/slice.ts';
import promoReducer from '../entity/promo/slice.ts';
import certificatesReducer from '../entity/certificate/slice.ts';
import tagReducer from '../entity/tag/slice';
//State Interface
import { CartState } from '../entity/cart/types';
import { UserState } from '../entity/users/types.ts'
import { CertificateState } from '../entity/certificate/types.ts'
import { CategoriesState } from '../entity/productCategory/types.ts'
import { LikedState } from '../entity/liked/types.ts'
import { FilterState } from '../entity/productFilter/types.ts'
import { ProductsState } from '../entity/product/types.ts'
import { PromoState } from '../entity/promo/types.ts'
import { TagState } from '../entity/tag/types';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    liked: likedReducer,
    user: userReducer,
    promo: promoReducer,
    certificates: certificatesReducer,
    tags: tagReducer,
  }
});

export type RootState = {
  products: ProductsState;
  filter: FilterState;
  categories: CategoriesState;
  cart: CartState;
  liked: LikedState;
  user: UserState;
  promo: PromoState;
  certificates: CertificateState;
  tags: TagState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 