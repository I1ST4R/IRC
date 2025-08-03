import { FilterActionTypes } from './types';

// Action creators
export const setPriceRange = (priceRange: { min: number; max: number }) => ({
  type: FilterActionTypes.SET_PRICE_RANGE as const,
  payload: priceRange
});

export const toggleTag = (tagId: string) => ({
  type: FilterActionTypes.TOGGLE_TAG as const,
  payload: tagId
});

export const resetFilters = () => ({
  type: FilterActionTypes.RESET_FILTERS as const
}); 