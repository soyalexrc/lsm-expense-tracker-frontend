import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Category} from "@/common/interfaces/expense.ts";
const BASE_URL = 'http://localhost:3001/api/v1/'

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getAllCategories: builder.query<Category[], void>({
            query: () => 'category'
        })
    })
})

export const {
    useGetAllCategoriesQuery
} = categoriesApi
