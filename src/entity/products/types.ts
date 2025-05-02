import { store } from '../../main/store/store';
import { FilterState } from '../../main/store/slices/filterSlice';
import { CategoriesState } from '../../main/store/slices/categoriesSlice';

export interface Product {
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

export interface RootState {
  user: any; // нахуй пока типизацию юзера
  products: {
    items: Product[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
  };
  filter: FilterState;
  categories: CategoriesState;
}

export type AppDispatch = typeof store.dispatch;