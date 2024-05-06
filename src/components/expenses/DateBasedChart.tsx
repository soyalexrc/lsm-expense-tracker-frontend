import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Rectangle} from 'recharts';
import {TotalAmountByDay} from "@/common/interfaces/expense.ts";

export default function DateBasedChart({data, xKey, yKey}: { data: TotalAmountByDay[], xKey: string, yKey: string}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                <XAxis dataKey={xKey}  angle={-40} textAnchor='end' />
                <YAxis dataKey={yKey}/>
                <Tooltip/>
                <Bar dataKey={yKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    );
}
