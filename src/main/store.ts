import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../entity/products/products.slice';
import filterReducer from '../entity/products/filterSlice';
import categoriesReducer from '../entity/productCategories/categoriesSlice';
import cartReducer from '../entity/cart/cart.slice';
import likedReducer from '../entity/products/likedSlice';
import userReducer from '../entity/users/users.slice';
import promoReducer from '../entity/promo/promo.slice';
import certificatesReducer from '../entity/certificates/certificates.slice';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { CartItem, CartTotals } from '../entity/cart/types';

interface Product {
  id: string;
  name: string;
  releaseDate: string;
  price: number;
  prevPrice?: number;
  technology: string;
  img: string;
  tags: {
    categoryId: string;
    tagId: string;
  }[];
}

interface ProductsState {
  items: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

interface Category {
  id: string;
  name: string;
  tags: {
    id: string;
    name: string;
  }[];
}

interface CategoriesState {
  items: Category[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

interface FilterState {
  minPrice: number | null;
  maxPrice: number | null;
  tags: string[];
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  totals: CartTotals | null;
}

interface LikedState {
  items: string[];
  loading: boolean;
  error: string | null;
}

interface UserState {
  id: string;
  login: string;
  email: string;
  type: string;
}

interface PromoState {
  code: string | null;
  discount: number | null;
  loading: boolean;
  error: string | null;
}

interface CertificatesState {
  code: string | null;
  amount: number | null;
  loading: boolean;
  error: string | null;
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    liked: likedReducer,
    user: userReducer,
    promo: promoReducer,
    certificates: certificatesReducer
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
  certificates: CertificatesState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 