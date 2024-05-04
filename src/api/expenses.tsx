import axios from '@/lib/helpers/axios-config.ts';
import {CreateExpense, Expense, GetTotalsResult} from "@/common/interfaces/expense.ts";
import {toast} from "sonner";
export async function getExpensesByUserId(userId: string) {
    return await axios.post<Expense[]>('/expense/GetByUserId', {userId}).then(data => data.data);
}

export async function getExpenseById(id: string): Promise<Expense> {
    return await axios.post<Expense>(`/expense/GetById/${id}`).then(data => data.data);
}

export async function updateExpense(id: string, expense: CreateExpense, reviewFn: () => void) {
    const {data} = await axios.patch(`/expense/${id}`, expense);
    toast("Expense updated!", {
        action: {
            label: 'Review',
            onClick: reviewFn,
        }
    });
    return data;
}


export async function createExpense(expense: CreateExpense, reviewFn: () => void) {
    try {
        const {data} = await axios.post(`/expense`, expense);
        toast("Expense registered!", {
            action: {
                label: 'Review',
                onClick: reviewFn,
            }
        });
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function deleteExpense(id: string) {
    try {
        const {data} = await axios.delete(`/expense/${id}`);
        toast("Expense deleted!", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify({message: 'deleted successfully'}, null, 2)}</code>
                </pre>
            ),
        });
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function getTotals(payload: { userId: string, dateFrom: string; dateTo: string }) {
    return await axios.post<GetTotalsResult>('/expense/GetTotals', payload).then(data => data.data);
}
