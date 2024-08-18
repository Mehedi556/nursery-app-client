import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://nursery-app-backend.vercel.app/api/v1' }),
    tagTypes: ['products', 'categories'],
    endpoints: () => ({}),
})
