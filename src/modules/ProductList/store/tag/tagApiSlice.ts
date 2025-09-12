import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTagsById } from './tagApi';

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Tag'],
  endpoints: (build) => ({
    getTagsById: build.query<string[], string[]>({
      queryFn: (tagsId) =>
        getTagsById(tagsId)
          .then((data) => ({ data }))
          .catch((error) => ({ error })),
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsByIdQuery } = tagApi;