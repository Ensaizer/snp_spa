import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserType } from '../../types/auth';

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/users' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], string>({
      query: () => `/`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Users', id }) as const) : [],
    }),
    getAllCustomers: builder.query<UserType[], string>({
      query: () => `/customers`,
    }),
    getAllPartners: builder.query<UserType[], string>({
      query: () => `/partners`,
    }),
    deleteUser: builder.mutation<{ id: number }, { id: number }>({
      query({ id }) {
        return {
          url: `/${id.toString()}`,
          method: 'DELETE',
        };
      },
      // invalidatesTags: (result, id) => [{ type: 'Users', id }],
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<UserType, UserType>({
      query({ isApproved }) {
        return {
          url: `/${isApproved.id.toString()}`,
          method: 'PATCH',
          body: isApproved,
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllCustomersQuery,
  useGetAllPartnersQuery,
  useUpdateUserMutation,
} = usersApi;
