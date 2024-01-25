import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


type CartType = {
    id: number,
    quantity: number,
    productId: number;
    userId: number;
}
// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/carts' }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getOneCartById: builder.query<CartType[], number>({
            query: (id) => `${id}`,
            providesTags: (result, error, arg) => result ? result.map(({ id }) => ({ type: 'Cart', id: arg } as const)) : [],
        }),
        updateCart: builder.mutation< number, CartType>({
            query(body) {
                return {
                    url: `/update`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Cart'],
        }),
        createCart: builder.mutation< number, CartType>({
            query(body) {
                return {
                    url: `/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: (result, error, arg) => [{type: 'Cart', id: arg.userId}],
        }),

        deleteCartById: builder.mutation< CartType, number >({
            query(id) {
                return {
                    url: `/${id.toString()}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Cart'],
        }),
        deleteAllCarts: builder.mutation< null , number[]>({
            query(body) {
                return {
                    url: `/`,
                    method: 'DELETE',
                    body
                }
            },
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const { useGetOneCartByIdQuery,
    useUpdateCartMutation,
    useDeleteCartByIdMutation,
    useDeleteAllCartsMutation,
    useCreateCartMutation
} = cartApi;

