import { TagActionTypes } from './types';
import { TagState, TagActions } from './types';

const initialState: TagState = {
  tags: [],
  loading: 'idle',
  error: null
};

export const tagReducer = (
  state = initialState,
  action: TagActions
): TagState => {
  switch (action.type) {
    // Загрузка тегов по ID
    case TagActionTypes.FETCH_TAGS_BY_ID_REQUEST:
      return {
        ...state,
        loading: 'pending',
        error: null
      };
    case TagActionTypes.FETCH_TAGS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: 'succeeded',
        tags: action.payload,
        error: null
      };
    case TagActionTypes.FETCH_TAGS_BY_ID_FAILURE:
      return {
        ...state,
        loading: 'failed',
        error: action.payload
      };

    default:
      return state;
  }
}; 