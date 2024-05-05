import {PieChart, Pie, Cell, Tooltip} from 'recharts';
import {TotalAmountByCategory} from "@/common/interfaces/expense.ts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CategoriesChart({ data }: { data: TotalAmountByCategory[] }) {

    return (
            <PieChart width={500} height={450}>
                <Pie
                    data={data}
                    cx={250}
                    cy={230}
                    innerRadius={140}
                    outerRadius={180}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
    );
}
