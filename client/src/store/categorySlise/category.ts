import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoryType } from '../../types';

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/categories' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryType[], string>({
      query: () => `/`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
