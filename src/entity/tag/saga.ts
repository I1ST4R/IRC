import { call, put, takeEvery } from 'redux-saga/effects';
import { getTagsById } from '../../services/api';
import { 
  fetchTagsSuccess, 
  fetchTagsFailure 
} from './slice';
import type { Tag } from './types';

interface FetchTagsAction {
  type: string;
  payload: string[];
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    return error;
  }
  return 'Failed to fetch tags';
}

function* fetchTagsSaga(action: FetchTagsAction): Generator<unknown, void, Tag[]> {
  try {
    const tags: Tag[] = yield call(getTagsById, action.payload);
    yield put(fetchTagsSuccess(tags));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error fetching tags:', error);
    yield put(fetchTagsFailure(errorMessage));
  }
}

export function* tagsSaga(): Generator<unknown, void, unknown> {
  yield takeEvery('tags/fetchTagsRequest', fetchTagsSaga);
}