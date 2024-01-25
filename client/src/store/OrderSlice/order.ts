import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { OrderType } from '../../types/orders';

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/orders' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrderByUserId: builder.query<OrderType[], number>({
      query: () => `/`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Order', id }) as const) : [],
    }),
    getAllOrdersId: builder.query<OrderType[], number>({
      query: (id) => `${id}`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Order', id }) as const) : [],
    }),
    updateOrderById: builder.mutation<number, OrderType>({
      query(body) {
        return {
          url: `/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetAllOrderByUserIdQuery, useGetAllOrdersIdQuery, useUpdateOrderByIdMutation } =
  cartApi;
