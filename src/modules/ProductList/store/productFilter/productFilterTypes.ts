

export interface PriceRange {
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
  isInitial: boolean,
  error: string | null;
}