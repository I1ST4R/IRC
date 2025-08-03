// import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import { TypedUseSelectorHook } from 'react-redux';
// //Reducers
// import productsReducer from '../entity/product/slice.ts';
// import filterReducer from '../entity/productFilter/slice.ts';
// import categoriesReducer from '../entity/productCategory/slice.ts';
// import cartReducer from '../entity/cart/slice.ts';
// import likedReducer from '../entity/liked/slice.ts';
// import userReducer from '../entity/users/slice.ts';
// import promoReducer from '../entity/promo/slice.ts';
// import certificateReducer from '../entity/certificate/slice.ts';
// import tagReducer from '../entity/tag/slice';
// import ordersReducer from '../entity/order/slice';
// //State Interface
// import { CartState } from '../entity/cart/types';
// import { UserState } from '../entity/users/types.ts'
// import { CertificateState } from '../entity/certificate/types.ts'
// import { CategoriesState } from '../entity/productCategory/types.ts'
// import { LikedState } from '../entity/liked/types.ts'
// import { FilterState } from '../entity/productFilter/types.ts'
// import { ProductsState } from '../entity/product/types.ts'
// import { PromoState } from '../entity/promo/types.ts'
// import { TagState } from '../entity/tag/types';
// import { OrdersState } from '../entity/order/types';

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     filter: filterReducer,
//     categories: categoriesReducer,
//     cart: cartReducer,
//     liked: likedReducer,
//     user: userReducer,
//     promo: promoReducer,
//     certificate: certificateReducer,
//     tags: tagReducer,
//     orders: ordersReducer,
//   }
// });

// export type RootState = {
//   products: ProductsState;
//   filter: FilterState;
//   categories: CategoriesState;
//   cart: CartState;
//   liked: LikedState;
//   user: UserState;
//   promo: PromoState;
//   certificate: CertificateState;
//   tags: TagState;
//   orders: OrdersState;
// };

// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 


// store.ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, type UnknownAction } from 'redux';
import { thunk } from 'redux-thunk';

// Импорты редьюсеров (убедитесь, что пути правильные)
import productsReducer from '../entity/product/reducer';
import filterReducer from '../entity/productFilter/reducer';
import { cartReducer } from '../entity/cart/reducer';
import likedReducer from '../entity/liked/reducer';
import userReducer from '../entity/user/reducer';
import promoReducer from '../entity/promo/reducer';
import certificateReducer from '../entity/certificate/reducer';
import tagReducer from '../entity/tag/reducer';
import ordersReducer from '../entity/order/reducer';

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  cart: cartReducer,
  liked: likedReducer,
  user: userReducer,
  promo: promoReducer,
  certificate: certificateReducer,
  tags: tagReducer,
  orders: ordersReducer,
});

// Создаем store
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// Типизация
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

// Типизированные хуки
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;