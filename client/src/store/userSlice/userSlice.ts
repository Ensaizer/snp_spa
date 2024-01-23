import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {UserType} from "../../types/auth";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/users' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserType[], string>({
            query: () => `/`,
        }),
        getAllCustomers: builder.query<UserType[], string>({
            query: () => `/customers`,
        }),
        getAllPartners: builder.query<UserType[], string>({
            query: () => `/partners`,
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `users/${id}`,
                    method: 'DELETE',
                }
            },
        }),
        updateUser: builder.mutation<UserType, Partial<UserType>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `users/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
        }),
    })
});

export const { useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetAllCustomersQuery,
    useGetAllPartnersQuery,
    useUpdateUserMutation
} = usersApi;
