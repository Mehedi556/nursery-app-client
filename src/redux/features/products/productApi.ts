import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
        query: (queryData) => {
            const { page, limit, searchTerm, filter, sortData } = queryData;
            return {
                url: 
                `/products` +
                (page ? `?page=${page}` : '') +
                (limit ? `&limit=${limit}` : '') +
                (searchTerm ? `&searchTerm=${searchTerm}` : '') +
                (filter?.filterValue ? `&${filter?.filterProperty}=${filter?.filterValue}`: '') +
                (sortData ? `&sort=${sortData}`: ''),
                method: 'GET'
            }
            
        },
        providesTags: ['products']
        }),

        getSingleProduct: builder.query({
        query: (id) => {
            return {
                url: `/products/${id}`,
                method: 'GET'
            }
            
        }
        }),

        createProduct: builder.mutation({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['products']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data?._id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['products']
        }),

        deleteProduct: builder.mutation({
            query: (_id) => ({
                url: `/products/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['products']
        }),
    }),
})

export const { useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation, useGetSingleProductQuery } = productApi;