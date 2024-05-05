import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {TotalAmountByPaymentMethod} from "@/common/interfaces/expense.ts";

interface Props {
    data: TotalAmountByPaymentMethod[],
    xKey: string,
    yKey: string,
}

export default function PaymentMethodsChart({ yKey, xKey, data }: Props) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    bottom: 60,
                }}
            >
                <XAxis dataKey={xKey} interval={0} angle={-40} textAnchor='end' />
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey={yKey} stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}
