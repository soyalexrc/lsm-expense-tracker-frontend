import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";
import {useDeleteExpenseMutation} from "@/lib/store/services/expenses.ts";
import {useEffect, useState} from "react";
import {toast} from "sonner";

interface Props {
    id: string
}

export default function DeleteExpenseButton({id}: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [ deleteExpense, { isLoading, isSuccess, isError } ] = useDeleteExpenseMutation();

    useEffect(() => {
        if (isSuccess) {
            setOpen(false)
            toast('Se realizo la accion con exito!')
        }
    }, [isSuccess]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
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
                    <AlertDialogAction onClick={() => deleteExpense(id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
