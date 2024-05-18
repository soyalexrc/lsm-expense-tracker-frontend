
import {ColumnDef} from "@tanstack/react-table";
import {Category, Expense} from "@/common/interfaces/expense.ts";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import ExpenseForm from "@/components/expenses/ExpenseForm.tsx";
import DeleteExpenseButton from "@/lib/helpers/expenses/DeleteExpenseButton.tsx";


export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => format(row.getValue('date'), 'P')
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const category: Category = row.getValue('category');
            return <div className='w-[120px] flex justify-center'>
                <Badge className='text-center'>{category.title}</Badge>
            </div>
        }
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            return <div className='w-[70px] text-center'>$ {row.getValue('amount')}</div>
        }
    },
    {
        accessorKey: 'description',
        header: 'Description'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const expense = row.original
            return (
                <div className='flex items-center gap-3'>
                    <ExpenseForm data={expense} />
                    <DeleteExpenseButton id={expense._id} />
                </div>
            )
        },
    },
]
