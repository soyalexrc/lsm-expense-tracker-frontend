
import {ColumnDef} from "@tanstack/react-table";
import {Category, Expense} from "@/common/interfaces/expense.ts";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useNavigate} from "react-router-dom";


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
            const navigate = useNavigate();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(expense._id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/expenses/${expense._id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
