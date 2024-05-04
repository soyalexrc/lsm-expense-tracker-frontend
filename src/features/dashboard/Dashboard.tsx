import SampleChart from "@/components/expenses/SampleChart.tsx";
import {useAuth} from "@clerk/clerk-react";
import {useQuery} from "react-query";
import {getStats} from "@/api/expenses.tsx";
import {DateRange} from "react-day-picker";
import {useState} from "react";
import {DatePicker} from "@/components/expenses/DatePicker.tsx";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";


export default function DashboardPage() {
    const {userId} = useAuth();
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const [drawerState, setDrawerState] = useState<boolean>(false);
    const {error, data, isLoading, refetch} = useQuery({
        queryKey: ['stats'],
        queryFn: () => getStats({
            userId: userId!,
            dateFrom: date?.from ? date.from.toDateString() : '',
            dateTo: date?.to ? date.to.toDateString() : '',
        })
    })

    function submitFilters() {
        refetch();
        setDrawerState(false);
    }

    if (isLoading) return 'loading...'

    if (error) 'An error ocurred...'

    return (
        <div>
            <Drawer open={drawerState} onOpenChange={setDrawerState}>
                <DrawerTrigger asChild>
                    <Button variant="outline">Filter</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Filter by date range</DrawerTitle>
                            <DrawerDescription>To see more specific data.</DrawerDescription>
                        </DrawerHeader>
                        <DatePicker className='' setDate={setDate} date={date}/>
                        <DrawerFooter>
                            <Button onClick={submitFilters}>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
            <div className={' p-4'}>
                <p className={'text-sm text-gray-500 font-bold mb-2'}>Total overall</p>
                <h2 className='text-6xl text-red-600 font-bold'>$ {data?.totalAmount.toFixed(2)}</h2>
            </div>
            <div className={'shadow border rounded-sm p-5 w-full h-[450px]'}>
                <SampleChart data={data!.totalAmountByCategory}/>
            </div>
        </div>
    );
}
