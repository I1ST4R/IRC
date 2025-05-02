export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  tags: string[];
}

export interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  selectedLines: string[];
  selectedCategories: string[];
}

export interface RootState {
  user: any; // нахуй пока типизацию юзера
  products: {
    items: Product[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
  };
  filter: FilterState;
} 