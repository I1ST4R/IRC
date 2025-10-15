import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTagsById } from './tagApi';
import { Tag } from './tagTypes';

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