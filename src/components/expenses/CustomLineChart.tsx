import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {TotalAmountByDay} from "@/common/interfaces/expense.ts";

export default function CustomLineChart({data, xKey, yKey}: { data: TotalAmountByDay[], xKey: string, yKey: string}) {
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
                <XAxis dataKey={xKey} interval={0} angle={-40} textAnchor='end' />
                <YAxis dataKey={yKey}/>
                <Tooltip/>
                <Line type="natural" dataKey={yKey} stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}
