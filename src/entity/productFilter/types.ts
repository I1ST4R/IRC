import { Tag } from '../productCategory/types'

interface PriceRange {
  min: number;
  max: number;
}

export interface FilterParams {
  priceRange: PriceRange;
  tagsId: string[];
}

export interface FilterState {
  filterParams: FilterParams;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}