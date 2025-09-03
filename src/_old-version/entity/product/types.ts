import { FilterParams } from '../productFilter/types';
import { Tag } from '../tag/types';

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  filters: FilterParams;
}
