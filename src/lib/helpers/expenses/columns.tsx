
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const navigate = useNavigate();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const queryClient = useQueryClient();

            async function handleDelete(id: string) {
                try {
                    await deleteExpense(id).then(() => {
                        queryClient.fetchQuery('expenses');
                    })
                }catch (e) {
                    console.log(e);
                }
            }

            return (
                <div className='flex items-center gap-3'>
                    <Button onClick={() => navigate(`/expenses/${expense._id}`)} variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Trash2 className='h-4 w-4'/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(row.original._id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]
