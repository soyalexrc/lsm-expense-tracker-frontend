import {useQuery} from "react-query";
import {getExpensesByUserId} from "@/api/expenses.tsx";
import {DataTable} from "@/lib/helpers/expenses/datatable.tsx";
import {columns} from "@/lib/helpers/expenses/columns.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
export default function ExpensesPage() {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const {error, data, isLoading} = useQuery({
        queryKey: ['expenses'],
        staleTime: 0,
        queryFn: () => getExpensesByUserId(token!)
    })


    if (isLoading) return 'Loading...'

    if (error) return 'An error has ocurred'

    return (
        <div>
            <div className='flex justify-end mb-3'>
                <Button onClick={() => navigate('/expenses/null')}>
                    <Plus className='mr-2'/>
                    New Expense
                </Button>
            </div>
            <DataTable columns={columns} data={data ?? []}/>
        </div>
    )
}
