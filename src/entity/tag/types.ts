export interface Tag {
  id: string;
  name: string;
  categoryId: string;
}

export interface TagState {
  tags: Tag[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export const enum TagActionTypes {
  FETCH_TAGS_BY_ID_REQUEST = 'FETCH_TAGS_BY_ID_REQUEST',
  FETCH_TAGS_BY_ID_SUCCESS = 'FETCH_TAGS_BY_ID_SUCCESS',
  FETCH_TAGS_BY_ID_FAILURE = 'FETCH_TAGS_BY_ID_FAILURE',
}

interface FetchTagsByIdRequestAction {
  type: TagActionTypes.FETCH_TAGS_BY_ID_REQUEST;
}

interface FetchTagsByIdSuccessAction {
  type: TagActionTypes.FETCH_TAGS_BY_ID_SUCCESS;
  payload: Tag[];
}

interface FetchTagsByIdFailureAction {
  type: TagActionTypes.FETCH_TAGS_BY_ID_FAILURE;
  payload: string;
}

export type TagActions =
  | FetchTagsByIdRequestAction
  | FetchTagsByIdSuccessAction
  | FetchTagsByIdFailureAction; 