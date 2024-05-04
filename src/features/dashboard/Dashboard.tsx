import {useAuth} from "@clerk/clerk-react";
import {useQuery} from "react-query";
import {getTotals} from "@/api/expenses.tsx";
import {DateRange} from "react-day-picker";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {getDateRangeByMonth, getPastTenYears, getWeeksInMonth, MONTHS} from "@/lib/helpers/date.ts";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import CustomLineChart from "@/components/expenses/CustomLineChart.tsx";


export default function DashboardPage() {
    const {userId} = useAuth();
    const [year, setYear] = useState<string>(String(new Date().getFullYear()));
    const [month, setMonth] = useState<string>(String(new Date().getMonth()));
    const [week, setWeek] = useState<string>('');
    const [date, setDate] = useState<DateRange | undefined>(getDateRangeByMonth(Number(year), Number(month)))

    const {error, data, isLoading, refetch, } = useQuery({
        queryKey: ['totals'],
        queryFn: () => getTotals({
            userId: userId!,
            dateFrom: date?.from ? date.from.toDateString() : '',
            dateTo: date?.to ? date.to.toDateString() : '',
        })
    });

    function onDateChange(value: string, type: 'year' | 'month') {
        if (type === 'month') {
            setMonth(value);
            setDate(getDateRangeByMonth(Number(year), Number(value)))
        } else {
            setYear(value);
            setDate(getDateRangeByMonth(Number(value), Number(month)))

        }
    }

    if (isLoading) return 'loading...'

    if (error) 'An error ocurred...'
    return (
        <div>
            <div className="grid grid-cols-12 gap-3">
                <Select value={year} onValueChange={(value) => onDateChange(value, 'year')}>
                    <SelectTrigger className='col-span-2'>
                        <SelectValue placeholder="Select a year"/>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Years</SelectLabel>
                            {
                                getPastTenYears()?.map(year => (
                                    <SelectItem key={year}
                                                value={year}>{year}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={month} onValueChange={(value) => onDateChange(value, 'month')}>
                    <SelectTrigger className='col-span-2'>
                        <SelectValue placeholder="Select a month"/>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            {
                                MONTHS?.map(month => (
                                    <SelectItem key={month.name}
                                                value={month.value.toString()}>{month.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className='col-span-2'>
                        <SelectValue placeholder="Select a week"/>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Weeks</SelectLabel>
                            {
                                getWeeksInMonth(Number(year), Number(month))?.map(week => (
                                    <SelectItem key={week.text}
                                                value={week.text}>{week.text}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className='col-span-2' variant='secondary' onClick={() => refetch()}>Search</Button>
            </div>
            <div className={' p-4'}>
                <p className={'text-sm text-gray-500 font-bold mb-2'}>Total overall</p>
                <h2 className='text-6xl text-red-600 font-bold'>$ {data?.totalAmount}</h2>
            </div>
            {
                data?.totalAmountByDay && data.totalAmountByDay.length > 0 &&
                <div className={'shadow border rounded-sm p-5 w-full h-[450px]'}>
                    <CustomLineChart yKey='totalAmount' xKey='date' data={data!.totalAmountByDay}/>
                </div>
            }
        </div>
    );
}
