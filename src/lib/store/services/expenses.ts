import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    CreateExpense,
    Expense,
    GetByUserIdWithFilters,
    GetTotalsResult,
    UpdateExpense
} from "@/common/interfaces/expense.ts";
// @ts-expect-error No se encuentra el modulo
import {FullTagDescription} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
const BASE_URL = 'http://localhost:3001/api/v1/'

export const expensesApi = createApi({
    reducerPath: 'expenseApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getExpensesByUserId: builder.query<Expense[], GetByUserIdWithFilters>({
            query: (body: GetByUserIdWithFilters) => ({
                url: 'expense/getByUserId',
                method: 'POST',
                body
            }),
            providesTags: (result) =>
                result
                    ? // successful query
                    [
                        ...result.map(({_id}) => ({type: 'Expenses', id: _id} as const)),
                        {type: 'Expenses', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Expenses', id: 'LIST' }` is invalidated
                    [{ type: 'Expenses', id: 'LIST' }] as FullTagDescription<never>
        }),
        addExpense: builder.mutation<CreateExpense, Partial<CreateExpense>>({
            query: (body) => ({
                url: 'expense',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Expenses' as never, id: 'LIST' }, { type: 'Totals' as never }],
        }),
        updateExpense: builder.mutation<UpdateExpense, Partial<UpdateExpense>>({
            query: (body) => ({
                url: `expense/${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'Expenses' as never, id: 'LIST' }, { type: 'Totals' as never}],
        }),
        deleteExpense: builder.mutation<UpdateExpense, string>({
            query: (id) => ({
                url: `expense/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Expenses' as never, id: 'LIST' }, { type: 'Totals' as never}],
        }),
        getTotals: builder.query<GetTotalsResult, { userId: string, dateFrom: string; dateTo: string }> ({
            query: (body) => ({
                url: 'expense/GetTotals',
                method: 'POST',
                body
            }),
            providesTags: () =>  ['Totals'] as FullTagDescription<never>
        })
    })
})

export const {
    useGetExpensesByUserIdQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    useGetTotalsQuery
} = expensesApi
