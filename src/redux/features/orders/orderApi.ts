import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const { useCreateOrderMutation } = orderApi;