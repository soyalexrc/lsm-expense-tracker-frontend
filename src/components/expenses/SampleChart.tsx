import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {TotalAmountByCategory} from "@/common/interfaces/expense.ts";

// const data = [
//     {
//         name: 'House services',
//         sn: 'HS',
//         amount: 2400.34,
//     },
//     {
//         name: 'Subscriptions',
//         sn: 'S',
//         amount: 1398,
//     },
//     {
//         sn: 'E',
//         name: 'Entertainment',
//         amount: 7654.32,
//     },
//     {
//         sn: 'SF',
//         name: 'Street food',
//         amount: 4800,
//     },
//     {
//         sn: 'T',
//         name: 'Transport',
//         amount: 3800,
//     },
//     {
//         sn: 'H',
//         name: 'Health',
//         amount: 4300,
//     },
//     {
//         sn: 'CE',
//         name: 'Car expenses',
//         amount: 1250,
//     },
//     {
//         sn: 'C',
//         name: 'Clothing',
//         amount: 940,
//     },
//     {
//         sn: 'ED',
//         name: 'Education',
//         amount: 134,
//     },
//     {
//         sn: 'OT',
//         name: 'Other',
//         amount: 340,
//     },
//     {
//         sn: 'P',
//         name: 'Parking',
//         amount: 55,
//     },
//
// ];


export default function SampleChart({data}: { data: TotalAmountByCategory[]}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 0,
                    right: 20,
                    left: 20,
                    bottom: 80,
                }}
            >
                <XAxis dataKey="category" interval={0} angle={-40} textAnchor='end' />
                <YAxis dataKey='totalAmount'/>
                <Tooltip/>
                <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}
