import { FilterParams } from '../productFilter/types';

export interface Product {
  id: string;
  name: string;
  technology: string;
  price: number;
  prevPrice?: number;
  quantity: string;
  img: string;
  tags: string[];
  article: string;
  description: string;
  formula: string[];
  for_what: string;
  skin_type: string;
}

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: FilterParams;
}
