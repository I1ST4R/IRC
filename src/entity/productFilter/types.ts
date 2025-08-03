

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
  error: string | null;
}

export const enum FilterActionTypes {
  SET_PRICE_RANGE = 'SET_PRICE_RANGE',
  TOGGLE_TAG = 'TOGGLE_TAG',
  RESET_FILTERS = 'RESET_FILTERS',
}

interface SetPriceRangeAction {
  type: FilterActionTypes.SET_PRICE_RANGE;
  payload: { min: number; max: number };
}

interface ToggleTagAction {
  type: FilterActionTypes.TOGGLE_TAG;
  payload: string;
}

interface ResetFiltersAction {
  type: FilterActionTypes.RESET_FILTERS;
}

export type FilterActions =
  | SetPriceRangeAction
  | ToggleTagAction
  | ResetFiltersAction;