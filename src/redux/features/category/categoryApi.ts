import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
        query: () => {
            return {
                url: `/categories`,
                method: 'GET'
            }
            
        },
        providesTags: ['categories']
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: '/categories',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['categories']
        }),

        updateCategory: builder.mutation({
            query: (data) => ({
                url: `/categories/${data?._id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['categories']
        }),

        deleteCategory: builder.mutation({
            query: (_id) => ({
                url: `/categories/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['categories']
        }),
    }),
})

export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;