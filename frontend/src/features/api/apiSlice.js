import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api' }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos',
    })
  })
})

export const { useGetVideosQuery } = apiSlice
