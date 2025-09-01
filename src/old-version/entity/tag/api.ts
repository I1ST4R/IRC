import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTagsById } from '../../services/api';
import { Tag } from './types';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Tag'],
  endpoints: (build) => ({
    getTagsById: build.query<Tag[], string[]>({
      queryFn: (tagsId) =>
        getTagsById(tagsId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsByIdQuery } = tagApi;