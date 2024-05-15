import {PieChart, Pie, Cell, Tooltip} from 'recharts';
import {TotalAmountByCategory} from "@/common/interfaces/expense.ts";

interface Props {
    data: TotalAmountByCategory[],
    innerRadius: number,
    outerRadius: number,
    cy: number,
    cx: number,
}


export default function CategoriesChart({ data, innerRadius, outerRadius, cy, cx }: Props) {

    return (
            <PieChart width={500} height={450}>
                <Pie
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color}  />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
    );
}
