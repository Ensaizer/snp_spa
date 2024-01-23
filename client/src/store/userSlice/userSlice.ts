import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {UserType} from "../../types/auth";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/users' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserType[], string>({
            query: () => `/`,
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'Users', id: 'LIST' }],
        }),
        getAllCustomers: builder.query<UserType[], string>({
            query: () => `/customers`,
        }),
        getAllPartners: builder.query<UserType[], string>({
            query: () => `/partners`,
        }),
        deleteUser: builder.mutation<{ id: number }, { id: number }>({
            query(id) {
                return {
                    url: `/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, id) => [{ type: 'Users', id }],
        }),
        updateUser: builder.mutation<UserType, Partial<UserType>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (result, id) => [{ type: 'Users', id }],
        }),
    })
});

export const { useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetAllCustomersQuery,
    useGetAllPartnersQuery,
    useUpdateUserMutation
} = usersApi;
