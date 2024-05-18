
import {ColumnDef} from "@tanstack/react-table";
import {Category, Expense} from "@/common/interfaces/expense.ts";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Pencil, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {useQueryClient} from "react-query";
import {deleteExpense} from "@/api/expenses.tsx";
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
