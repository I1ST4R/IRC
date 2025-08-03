
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, type UnknownAction } from 'redux';
import { thunk } from 'redux-thunk';

// Импорты редьюсеров (убедитесь, что пути правильные)
import {productReducer} from '../entity/product/reducers';
import {filterReducer} from '../entity/productFilter/reducers';
import {cartReducer} from '../entity/cart/reducers';
import {likedReducer} from '../entity/liked/reducers';
import {userReducer} from '../entity/users/reducers';
import {promoReducer} from '../entity/promo/reducers';
import {certificateReducer} from '../entity/certificate/reducers';
import {categoryReducer} from '../entity/productCategory/reducers';
import {orderReducer} from '../entity/order/reducers';

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  products: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  liked: likedReducer,
  user: userReducer,
  promo: promoReducer,
  certificate: certificateReducer,
  categories: categoryReducer,
  orders: orderReducer,
}) as any;

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