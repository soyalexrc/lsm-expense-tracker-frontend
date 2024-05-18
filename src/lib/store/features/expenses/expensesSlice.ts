import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import {Expense} from "@/common/interfaces/expense.ts";

export interface ExpensesState {
    expenses: Expense[]
}

const initialState: ExpensesState = {
    expenses: [],
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
    },
})

// Action creators are generated for each case reducer function
export const { } = expensesSlice.actions

export default expensesSlice.reducer
