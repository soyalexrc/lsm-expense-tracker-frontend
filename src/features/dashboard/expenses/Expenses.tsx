import {useQuery} from "react-query";
import {getExpensesByUserId} from "@/api/expenses.tsx";
import {DataTable} from "@/lib/helpers/expenses/datatable.tsx";
import {columns} from "@/lib/helpers/expenses/columns.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input.tsx";
import {DatePicker} from "@/components/expenses/DatePicker.tsx";
import {getCategories} from "@/api/categories.ts";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {useAuth} from "@clerk/clerk-react";
import {useState} from "react";
import {DateRange} from "react-day-picker";

export default function ExpensesPage() {
    const {userId} = useAuth();
    const navigate = useNavigate();
    const [date, setDate] = useState<DateRange | undefined>(undefined)


    const {error, data, isLoading} = useQuery({
        queryKey: ['expenses'],
        staleTime: 0,
        queryFn: () => getExpensesByUserId(userId!)
    })

    const {error: cError, data: categories, isLoading: cLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })


    if (isLoading) return (
        <div className=" my-10 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                        <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    )

    if (error) return 'An error has ocurred'

    return (
        <div>
            <div className={'flex gap-4 mb-10'}>
                <div className="relative flex-[0.3]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search expenses..."
                        className="w-full appearance-none bg-background pl-8 shadow-none "
                    />
                </div>
                <DatePicker date={date} setDate={setDate} className='flex-[0.3]'/>
                <Select disabled={cLoading || Boolean(cError)}>
                    <SelectTrigger className='flex-[0.3]'>
                        <SelectValue placeholder="Select a category"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {
                                categories?.map(category => (
                                    <SelectItem key={category._id}
                                                value={category._id}>{category.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex justify-between items-end my-3'>
                <p className={'text-gray-500 text-sm'}><b>{data?.length} </b>registros</p>
                <Button onClick={() => navigate('/expenses/null')}>
                    <Plus className='mr-2'/>
                    New Expense
                </Button>
            </div>
            <DataTable columns={columns} data={data ?? []}/>
        </div>
    )
}
