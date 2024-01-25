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
    }),
    getAllOrdersByUserId: builder.query<OrderType[], number>({
      query: (id) => `${id}`,
    }),
    updateOrderById: builder.mutation<number, OrderType>({
      query(body) {
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
