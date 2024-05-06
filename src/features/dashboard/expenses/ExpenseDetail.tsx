import {useMutation, useQuery, useQueryClient} from "react-query";
import {createExpense, getExpenseById, updateExpense} from "@/api/expenses.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getCategories} from "@/api/categories.ts";
import {CreateExpense} from "@/common/interfaces/expense.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {AlertCircle, CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {getUserSettingsByUserId} from "@/api/user-settings.ts";
import {Helmet} from "react-helmet";

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    date: z.date(),
    category: z.string().min(1, 'Category is required'),
    paymentMethod: z.string().min(1, 'Payment method is required'),
    amount: z.string().min(1, 'Amount is required')
})

export default function ExpenseDetailPage() {
    const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {error: categoriesError, data: categories, isLoading: categoriesLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });
    const {error, data, isLoading} = useQuery({
        queryKey: ['expense'],
        enabled: id !== 'null',
        queryFn: () => getExpenseById(id!)
    })
    const {error: usError, data: usData, isLoading: usLoading} = useQuery({
        queryKey: ['userSettings'],
        queryFn: () => getUserSettingsByUserId(userId!)
    })
    const updateExpenseMutation = useMutation({
        mutationFn: (expense: CreateExpense) => updateExpense(id!, expense, () => navigate(-1)),
        onSuccess: () => onSuccessMutation()
    })

    const createExpenseMutation = useMutation({
        mutationFn: (expense: CreateExpense) => createExpense( expense, () => navigate(-1)),
        onSuccess: () => onSuccessMutation()
    })

    async function onSuccessMutation() {
        await queryClient.invalidateQueries({ queryKey: ['expenses'] })
        await queryClient.invalidateQueries({ queryKey: ['expense'] })
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            ...values,
            amount: Number(values.amount),
            userId
        }
        try {
            if (id !== 'null') {
                updateExpenseMutation.mutate(payload)
            } else {
                createExpenseMutation.mutate(payload);
            }
            form.reset();
            navigate('/expenses');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (id === 'null') {
            form.reset();
        } else {
            form.setValue('title', data?.title ?? '')
            form.setValue('category', data?.category?._id ?? '')
            form.setValue('description', data?.description ?? '')
            form.setValue('paymentMethod', data?.paymentMethod ?? '')
            form.setValue('date', data?.date ? new Date(data.date) : new Date())
            form.setValue('amount', data?.amount?.toString() ?? '')
        }
    }, [data]);


    if (isLoading || categoriesLoading) return 'Loading...'

    if (error) return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                An error has ocurred while loading the expense, please try again.
            </AlertDescription>
        </Alert>
    )
    return (
        <>
            <Helmet>
                <title>LSM Expense Tracker - {id !== 'null' ? form.getValues('title') : 'New Expense'}</title>
            </Helmet>
            {categoriesError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error has ocurred while loading the categories, please try again.
                    </AlertDescription>
                </Alert>
            )}
            {usError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error has ocurred while loading the payment methods, please try again.
                    </AlertDescription>
                </Alert>
            )}
            <div className='md:flex md:justify-center'>
                <Card className='p-6 md:min-w-[500px]'>
                    {id === 'null' && <CardHeader>
                        <CardTitle>New Expense</CardTitle>
                    </CardHeader>}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex items-end gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input autoFocus={true} placeholder="Title" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem className='flex-1'>
                                            <div className={'flex items-center justify-between'}>
                                                <FormLabel>Category</FormLabel>
                                                {/*<Button type='button' variant="outline" >*/}
                                                {/*    <Plus className="h-4 w-4 mr-2" />*/}
                                                {/*    New Category*/}
                                                {/*</Button>*/}
                                            </div>
                                            <FormControl>
                                                <Select disabled={categoriesLoading} onValueChange={field.onChange}
                                                        value={field.value}>
                                                    <SelectTrigger>
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
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Description' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({field}) => (
                                    <FormItem className='flex-1'>
                                        <div className={'flex items-center justify-between'}>
                                            <FormLabel>Payment method</FormLabel>
                                            {/*<Button type='button' variant="outline" >*/}
                                            {/*    <Plus className="h-4 w-4 mr-2" />*/}
                                            {/*    New Payment Method*/}
                                            {/*</Button>*/}
                                        </div>
                                        <FormControl>
                                            <Select disabled={usLoading} onValueChange={field.onChange}
                                                    value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a payment method"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Payment Methods by user</SelectLabel>
                                                        {
                                                            usData?.paymentMethods?.map(paymentMethod => (
                                                                <SelectItem key={paymentMethod._id}
                                                                            value={paymentMethod._id}>{paymentMethod.title}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-end gap-4'>
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel>Date</FormLabel>
                                            <br/>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({field}) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl >
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className='w-full' type="submit">Submit</Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
}
