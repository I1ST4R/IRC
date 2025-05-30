import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../entity/products/products.slice';
import filterReducer from '../entity/products/filterSlice';
import categoriesReducer from '../entity/productCategories/categoriesSlice';
import cartReducer from '../entity/products/cartSlice';
import likedReducer from '../entity/products/likedSlice';
import userReducer from '../entity/users/users.slice';
import promoReducer from '../entity/promo/promo.slice';
import certificatesReducer from '../entity/certificates/certificates.slice';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

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
  categories: Category[];
  isLoading: boolean;
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
    certificates: certificatesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState> & {
  products: ProductsState;
  categories: CategoriesState;
};

export type AppDispatch = typeof store.dispatch;

// Типы для хуков
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 