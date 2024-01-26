import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { OrderType } from '../../types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/orders' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation<boolean, OrderType>({
      query(body) {
        return {
          url: `/`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Orders'],
    }),
    getAllOrders: builder.query<OrderType[], string>({
      query: () => `/`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Orders', id }) as const),
              { type: 'Orders', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Orders', id: 'LIST' }],
    }),
    getAllOrdersByUserId: builder.query<OrderType[], number>({
      query: (id) => `${id}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Orders', id }) as const),
              { type: 'Orders', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Orders', id: 'LIST' }],
    }),
    updateOrderById: builder.mutation<number, OrderType>({
      query(body) {
        console.log(body);
        return {
          url: `/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useGetAllOrdersByUserIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderByIdMutation,
} = orderApi;
