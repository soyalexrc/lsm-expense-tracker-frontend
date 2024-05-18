// import {getExpensesByUserId} from "@/api/expenses.tsx";
import {DataTable} from "@/lib/helpers/expenses/datatable.tsx";
import {columns} from "@/lib/helpers/expenses/columns.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {DatePicker} from "@/components/expenses/DatePicker.tsx";
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
import {Helmet} from "react-helmet";
import ExpenseForm from "@/components/expenses/ExpenseForm.tsx";
import {useGetExpensesByUserIdQuery} from "@/lib/store/services/expenses.ts";
import {useGetAllCategoriesQuery} from "@/lib/store/services/categories.ts";
import {useGetUserSettingsByUserIdQuery} from "@/lib/store/services/userSettings.ts";

export default function ExpensesPage() {
    const {userId} = useAuth();
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const { data, isLoading, error } = useGetExpensesByUserIdQuery({
        userId: userId!,
        title,
        categoryId: category,
        paymentMethod,
        dateFrom: date?.from ? date.from.toDateString() : '',
        dateTo: date?.to ? date.to.toDateString() : '',
    });
    const { data: categories, isLoading: cLoading, error: cError,  } = useGetAllCategoriesQuery()
    const {error: sError, data: settings, isLoading: sLoading} = useGetUserSettingsByUserIdQuery({
        userId: userId!
    })


    if (isLoading) return 'Loading...'

    if (error) return 'An error has ocurred'

    return (
        <div>
            <Helmet>
                <title>LSM Expense Tracker - Expenses</title>
            </Helmet>
            <div className={'grid grid-cols-5 gap-4 mb-10'}>
                <div className="relative sm:col-span-1 col-span-5">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Search expenses..."
                        className="w-full appearance-none bg-background pl-8 shadow-none "
                    />
                </div>
                <DatePicker date={date} setDate={setDate} className='sm:col-span-1 col-span-5'/>
                <Select disabled={cLoading || Boolean(cError)} value={category} onValueChange={(value) => value === 'all' ? setCategory('') : setCategory(value)}>
                    <SelectTrigger className='sm:col-span-1 col-span-5'>
                        <SelectValue placeholder="Select a category"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value='all'>All</SelectItem>
                            {
                                categories?.map(category => (
                                    <SelectItem key={category._id}
                                                value={category._id}>{category.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select disabled={Boolean(sError) || sLoading} value={paymentMethod} onValueChange={(value) => value === 'all' ? setPaymentMethod('') : setPaymentMethod(value)}>
                    <SelectTrigger className='sm:col-span-1 col-span-5'>
                        <SelectValue placeholder="Select a payment method"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Payment Methods</SelectLabel>
                            <SelectItem value='all'>All</SelectItem>
                            {
                                settings?.paymentMethods.map(paymentMethod => (
                                    <SelectItem key={paymentMethod._id}
                                                value={paymentMethod._id}>{paymentMethod.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/*<Button className='sm:col-span-1 col-span-5'>Search</Button>*/}
            </div>
            <div className='flex justify-between items-end my-3'>
                <p className={'text-gray-500 text-sm'}><b>{data?.length} </b>registros</p>
                <ExpenseForm data={{_id: 'null'}} />
            </div>
            <DataTable columns={columns} data={data ?? []}/>
        </div>
    )
}
