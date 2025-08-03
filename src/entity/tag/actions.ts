import { TagActionTypes } from './types';
import { getTagsById } from '../../services/api';
import { Tag } from './types';

// Action creators
const fetchTagsByIdRequest = () => ({ 
  type: TagActionTypes.FETCH_TAGS_BY_ID_REQUEST as const 
});

const fetchTagsByIdSuccess = (tags: Tag[]) => ({
  type: TagActionTypes.FETCH_TAGS_BY_ID_SUCCESS as const,
  payload: tags
});

const fetchTagsByIdFailure = (error: string) => ({
  type: TagActionTypes.FETCH_TAGS_BY_ID_FAILURE as const,
  payload: error
});

// Thunk actions
export const fetchTagsById = (tagsId: string[]) => {
  return async (dispatch: any) => {
    dispatch(fetchTagsByIdRequest());
    try {
      const response = await getTagsById(tagsId);
      dispatch(fetchTagsByIdSuccess(response));
    } catch (error) {
      dispatch(fetchTagsByIdFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 