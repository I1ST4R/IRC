

export interface Category {
  id: string;
  name: string;
  tags: string[];
}

export interface CategoriesState {
  categories: Category[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}