import { FilterActionTypes } from './types';
import { FilterState, FilterActions } from './types';

const initialState: FilterState = {
  filterParams: {
    priceRange: {
      min: 500,
      max: 10000
    },
    tagsId: [],
  },
  loading: 'idle',
  error: null
};

export const filterReducer = (
  state = initialState,
  action: FilterActions
): FilterState => {
  switch (action.type) {
    // Установка диапазона цен
    case FilterActionTypes.SET_PRICE_RANGE:
      return {
        ...state,
        filterParams: {
          ...state.filterParams,
          priceRange: action.payload
        }
      };

    // Переключение тега
    case FilterActionTypes.TOGGLE_TAG:
      const tagId = action.payload;
      const currentTags = state.filterParams.tagsId;
      const tagIndex = currentTags.indexOf(tagId);
      
      const newTags = tagIndex === -1
        ? [...currentTags, tagId]
        : currentTags.filter((_, index) => index !== tagIndex);
      
      return {
        ...state,
        filterParams: {
          ...state.filterParams,
          tagsId: newTags
        }
      };

    // Сброс фильтров
    case FilterActionTypes.RESET_FILTERS:
      return {
        ...state,
        filterParams: {
          priceRange: {
            min: 500,
            max: 10000
          },
          tagsId: [],
        }
      };

    default:
      return state;
  }
}; 