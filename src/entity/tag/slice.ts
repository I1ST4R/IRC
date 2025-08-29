import { PayloadAction } from '@reduxjs/toolkit';
import { TagState, Tag } from './types';
import { createEntityModule } from '@/shared/entityFactory';
import { getTagsById } from '@/services/api';

const initialState: TagState = {
  tags: [],
  loading: "idle",
  error: null
};

const tagModule = createEntityModule<string[], Tag[], TagState>({
  sliceName: 'tags',
  initialState,
  requestActionName: 'fetchTagsRequest',
  actionNames: {
    request: 'fetchTagsRequest',
    success: 'fetchTagsSuccess',
    failure: 'fetchTagsFailure',
    clear: 'clearTags'
  },
  onRequest: (state, _action: PayloadAction<string[]>) => {
    state.loading = 'pending';
    state.error = null;
  },
  onSuccess: (state, action: PayloadAction<Tag[]>) => {
    state.tags = action.payload;
    state.loading = 'succeeded';
  },
  onFailure: (state, action: PayloadAction<string>) => {
    state.loading = 'failed';
    state.error = action.payload;
  },
  onClear: (state) => {
    state.tags = [];
    state.error = null;
  },
  extraReducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    }
  },
  apiCall: getTagsById
});

const { request: fetchTagsRequest, success: fetchTagsSuccess, failure: fetchTagsFailure, clear: clearTags } = tagModule.actions;

export const { setTags } = { setTags: (tagModule.actions as unknown as Record<string, unknown>).setTags as (payload: Tag[]) => PayloadAction<Tag[]> };

export { fetchTagsRequest, fetchTagsSuccess, fetchTagsFailure, clearTags };

export default tagModule.reducer;
export const tagsSaga = tagModule.saga;