import axios from '@/lib/helpers/axios-config.ts';
import {CreateExpense, Expense} from "@/common/interfaces/expense.ts";
import {toast} from "@/components/ui/use-toast.ts";
export async function getExpensesByUserId(token: string) {
    return await axios.post<Expense[]>('/expense/GetByUserId', {token}).then(data => data.data);
}

export async function getExpenseById(id: string, token: string): Promise<Expense> {
    console.log('expense by id')
    return await axios.post<Expense>(`/expense/GetById/${id}`, {token}).then(data => data.data);
}

export async function updateExpense(id: string, token: string, expense: CreateExpense) {
    const {data} = await axios.patch(`/expense/${id}`, {token, ...expense});
    toast({
        title: "Expense updated!",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(expense, null, 2)}</code>
            </pre>
        ),
    });
    return data;
}


export async function createExpense(token: string, expense: CreateExpense) {
    try {
        const {data} = await axios.post(`/expense`, {token, ...expense});
        toast({
            title: "Expense registered!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(expense, null, 2)}</code>
                </pre>
            ),
        });
        return data;
    } catch (e) {
        console.log(e);
    }
}
