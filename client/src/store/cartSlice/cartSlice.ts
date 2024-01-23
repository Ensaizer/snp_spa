import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoryType } from '../../types';

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/carts' }),
    endpoints: (builder) => ({
        getOneCartById: builder.query<CategoryType[], number>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetOneCartByIdQuery } = cartApi;

